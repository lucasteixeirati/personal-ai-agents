const fs = require('node:fs');
const path = require('node:path');

const resultPath = path.resolve(__dirname, '..', 'results', 'eval-results.json');
const summaryPath = process.env.GITHUB_STEP_SUMMARY;
if (!summaryPath) process.exit(0);

let markdown = '# Avaliação comportamental\n\n';
markdown += `- commit: \`${process.env.GITHUB_SHA || 'execução local'}\`\n`;
markdown += `- target: \`${process.env.EVAL_TARGET || 'não informado'}\`\n`;
markdown += `- grader: \`${process.env.EVAL_GRADER || process.env.EVAL_TARGET || 'não informado'}\`\n`;
markdown += `- repetições por caso: \`${process.env.EVAL_REPEAT || '1'}\`\n\n`;

if (!fs.existsSync(resultPath)) {
  markdown += 'O processo terminou antes de produzir o relatório JSON. Consulte os logs do job.\n';
} else {
  const document = JSON.parse(fs.readFileSync(resultPath, 'utf8'));
  const stats = document.results?.stats || {};
  markdown += '| Aprovados | Reprovados | Erros |\n';
  markdown += '|---:|---:|---:|\n';
  markdown += `| ${stats.successes ?? 0} | ${stats.failures ?? 0} | ${stats.errors ?? 0} |\n\n`;
  markdown += 'Os relatórios JSON, HTML e JUnit estão disponíveis nos artefatos do workflow.\n';
}

fs.appendFileSync(summaryPath, markdown, 'utf8');
