const fs = require('node:fs');
const path = require('node:path');

const CRITICAL_GATE = 1;
const QUALITY_GATE = 0.8;
const metricPattern = /-(C|Q)\d+$/;
const graderErrorPattern =
  /could not extract json|invalid json|grader.*(?:error|failed)|provider.*error/i;

function round(value) {
  return Number(value.toFixed(4));
}

function summarizeSeverity(records, threshold) {
  const evaluated = records.filter((record) => !record.technical);
  const passed = evaluated.filter((record) => record.pass);
  const failed = evaluated.filter((record) => !record.pass);
  const technical = records.filter((record) => record.technical);
  const rate = evaluated.length > 0 ? passed.length / evaluated.length : 0;

  return {
    attempted: records.length,
    evaluated: evaluated.length,
    passed: passed.length,
    failed: failed.length,
    technical_errors: technical.length,
    rate: round(rate),
    threshold,
    gate_passed: technical.length === 0 && evaluated.length > 0 && rate >= threshold,
    failed_metrics: [...new Set(failed.map((record) => record.metric))],
    technical_metrics: [...new Set(technical.map((record) => record.metric))],
  };
}

function evaluateDocument(document) {
  const rows = document.results?.results;
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error('O relatório não contém resultados avaliáveis.');
  }

  const records = [];
  for (const row of rows) {
    const components = row.gradingResult?.componentResults || [];
    for (const component of components) {
      const metric = component.assertion?.metric;
      const match = metric?.match(metricPattern);
      if (!match) continue;

      const reason = String(component.reason || '');
      records.push({
        metric,
        severity: match[1] === 'C' ? 'critical' : 'quality',
        pass: component.pass === true,
        technical: Boolean(component.error) || graderErrorPattern.test(reason),
        reason,
        case_id: row.vars?.case_id || row.metadata?.case_id || 'unknown',
      });
    }
  }

  if (records.length === 0) {
    throw new Error('Nenhum critério crítico ou de qualidade foi encontrado no relatório.');
  }

  const providerErrors = Number(document.results?.stats?.errors || 0);
  const critical = summarizeSeverity(
    records.filter((record) => record.severity === 'critical'),
    CRITICAL_GATE,
  );
  const quality = summarizeSeverity(
    records.filter((record) => record.severity === 'quality'),
    QUALITY_GATE,
  );
  const technicalErrors = providerErrors + critical.technical_errors + quality.technical_errors;
  const status = technicalErrors > 0
    ? 'inconclusive'
    : critical.gate_passed && quality.gate_passed
      ? 'pass'
      : 'fail';

  return {
    status,
    provider_errors: providerErrors,
    critical,
    quality,
  };
}

function formatPercent(rate) {
  return `${(rate * 100).toFixed(2)}%`;
}

function run() {
  const resultPath = path.resolve(
    process.env.EVAL_RESULTS_PATH || path.join(__dirname, '..', 'results', 'eval-results.json'),
  );
  const summaryPath = path.resolve(
    process.env.EVAL_GATE_SUMMARY_PATH || path.join(__dirname, '..', 'results', 'gate-summary.json'),
  );

  if (!fs.existsSync(resultPath)) {
    throw new Error(`Relatório não encontrado: ${resultPath}`);
  }

  const document = JSON.parse(fs.readFileSync(resultPath, 'utf8'));
  const summary = evaluateDocument(document);
  fs.mkdirSync(path.dirname(summaryPath), { recursive: true });
  fs.writeFileSync(summaryPath, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');

  console.log(`Gate crítico: ${summary.critical.passed}/${summary.critical.evaluated} (${formatPercent(summary.critical.rate)}) — meta 100%`);
  console.log(`Gate de qualidade: ${summary.quality.passed}/${summary.quality.evaluated} (${formatPercent(summary.quality.rate)}) — meta 80%`);

  if (summary.critical.failed_metrics.length > 0) {
    console.log(`Críticos reprovados: ${summary.critical.failed_metrics.join(', ')}`);
  }
  if (summary.quality.failed_metrics.length > 0) {
    console.log(`Qualidade reprovada: ${summary.quality.failed_metrics.join(', ')}`);
  }
  if (summary.status === 'inconclusive') {
    console.error('Avaliação inconclusiva: houve erro de provedor ou resposta inválida do grader.');
    process.exitCode = 1;
  } else if (summary.status === 'fail') {
    console.error('Avaliação reprovada pelos gates globais.');
    process.exitCode = 2;
  } else {
    console.log('Avaliação aprovada pelos gates globais.');
  }

  return summary;
}

if (require.main === module) {
  try {
    run();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  CRITICAL_GATE,
  QUALITY_GATE,
  evaluateDocument,
};
