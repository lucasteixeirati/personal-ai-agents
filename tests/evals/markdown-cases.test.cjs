const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { loadCases, toPromptfooTests } = require('./markdown-cases.cjs');

const cases = loadCases();

test('carrega a suíte comportamental completa sem duplicidade', () => {
  assert.equal(cases.length, 34);
  assert.equal(new Set(cases.map((item) => item.id)).size, cases.length);
  assert.equal(new Set(cases.map((item) => item.agentId)).size, 8);
});

test('preserva a cobertura crítica e de qualidade atual', () => {
  const criteria = cases.flatMap((item) => item.criteria);
  assert.equal(criteria.filter((item) => item.severity === 'crítico').length, 44);
  assert.equal(criteria.filter((item) => item.severity === 'qualidade').length, 71);
  assert.equal(new Set(criteria.map((item) => item.id)).size, criteria.length);
});

test('mantém cenário, agente, versão e origem rastreáveis', () => {
  for (const item of cases) {
    assert.match(item.id, /^[A-Z]{3}-\d{2}$/);
    assert.ok(item.scenario.length > 10, `${item.id} sem cenário útil`);
    assert.ok(item.agentMarkdown.includes(`id: ${item.agentId}`));
    assert.ok(item.agentMarkdown.includes(`version: ${item.agentVersion}`));
    assert.match(item.source, /^tests\/.+\.cases\.md$/);
  }
});

test('gera gates de 100% para críticos e 80% para qualidade', () => {
  const generated = toPromptfooTests(cases, { grader: 'mock:grader', repeat: 3 });
  assert.equal(generated.length, cases.length);
  for (const item of generated) {
    assert.equal(item.options.repeat, 3);
    assert.equal(item.assert[0].threshold, 1);
    assert.equal(item.assert[1].threshold, 0.8);
    assert.ok(item.assert[0].assert.every((entry) => entry.provider === 'mock:grader'));
    assert.ok(
      item.assert[0].assert.every((entry) =>
        entry.value.includes('cada uma deve aparecer de forma clara'),
      ),
    );
  }
});

test('mantém framework e correções transitivas fixados no lockfile', () => {
  const root = path.resolve(__dirname, '..', '..');
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  const lock = JSON.parse(fs.readFileSync(path.join(root, 'package-lock.json'), 'utf8'));

  assert.equal(lock.packages['node_modules/promptfoo'].version, manifest.devDependencies.promptfoo);
  assert.equal(lock.packages['node_modules/adm-zip'].version, manifest.overrides['adm-zip']);
  assert.equal(lock.packages['node_modules/sharp'].version, manifest.overrides.sharp);
});
