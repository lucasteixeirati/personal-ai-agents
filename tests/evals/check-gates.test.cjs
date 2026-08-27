const test = require('node:test');
const assert = require('node:assert/strict');
const { evaluateDocument } = require('./check-gates.cjs');

function component(metric, pass, reason = 'avaliação concluída') {
  return {
    assertion: { metric },
    pass,
    score: pass ? 1 : 0,
    reason,
  };
}

function documentWith(components, errors = 0) {
  return {
    results: {
      stats: { errors },
      results: [
        {
          vars: { case_id: 'TST-01' },
          gradingResult: { componentResults: components },
        },
      ],
    },
  };
}

test('aprova somente com 100% crítico e ao menos 80% de qualidade', () => {
  const summary = evaluateDocument(
    documentWith([
      component('TST-01-C1', true),
      component('TST-01-C2', true),
      component('TST-01-Q1', true),
      component('TST-01-Q2', true),
      component('TST-01-Q3', true),
      component('TST-01-Q4', true),
      component('TST-01-Q5', false),
    ]),
  );

  assert.equal(summary.status, 'pass');
  assert.equal(summary.critical.rate, 1);
  assert.equal(summary.quality.rate, 0.8);
});

test('aplica qualidade globalmente, não caso a caso', () => {
  const document = {
    results: {
      stats: { errors: 0 },
      results: [
        {
          vars: { case_id: 'TST-01' },
          gradingResult: {
            componentResults: [component('TST-01-C1', true), component('TST-01-Q1', false)],
          },
        },
        {
          vars: { case_id: 'TST-02' },
          gradingResult: {
            componentResults: [
              component('TST-02-C1', true),
              component('TST-02-Q1', true),
              component('TST-02-Q2', true),
              component('TST-02-Q3', true),
              component('TST-02-Q4', true),
            ],
          },
        },
      ],
    },
  };

  const summary = evaluateDocument(document);
  assert.equal(summary.status, 'pass');
  assert.equal(summary.quality.passed, 4);
  assert.equal(summary.quality.evaluated, 5);
});

test('reprova qualquer critério crítico e qualidade abaixo de 80%', () => {
  const summary = evaluateDocument(
    documentWith([
      component('TST-01-C1', false),
      component('TST-01-Q1', true),
      component('TST-01-Q2', true),
      component('TST-01-Q3', true),
      component('TST-01-Q4', false),
      component('TST-01-Q5', false),
    ]),
  );

  assert.equal(summary.status, 'fail');
  assert.equal(summary.critical.gate_passed, false);
  assert.equal(summary.quality.rate, 0.6);
});

test('classifica resposta inválida do grader como inconclusiva', () => {
  const summary = evaluateDocument(
    documentWith([
      component('TST-01-C1', true),
      component('TST-01-Q1', false, 'Could not extract JSON from llm-rubric response'),
    ]),
  );

  assert.equal(summary.status, 'inconclusive');
  assert.equal(summary.quality.technical_errors, 1);
  assert.equal(summary.quality.evaluated, 0);
});
