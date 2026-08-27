const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const resultsDirectory = path.resolve(__dirname, '..', 'results');
const generatedFiles = [
  'eval-results.json',
  'eval-report.html',
  'eval-results.junit.xml',
  'gate-summary.json',
];

fs.mkdirSync(resultsDirectory, { recursive: true });
for (const fileName of generatedFiles) {
  fs.rmSync(path.join(resultsDirectory, fileName), { force: true });
}

const promptfooEntrypoint = path.join(path.dirname(require.resolve('promptfoo')), 'entrypoint.js');
const args = [
  promptfooEntrypoint,
  'eval',
  '-c',
  'tests/evals/promptfooconfig.cjs',
  '--no-cache',
  '--no-share',
  '--output',
  'tests/results/eval-results.json',
  '--output',
  'tests/results/eval-report.html',
  '--output',
  'tests/results/eval-results.junit.xml',
];

if (process.env.EVAL_FILTER?.trim()) {
  args.push('--filter-pattern', process.env.EVAL_FILTER.trim());
}

const evaluation = spawnSync(process.execPath, args, {
  cwd: path.resolve(__dirname, '..', '..'),
  env: {
    ...process.env,
    PROMPTFOO_FAILED_TEST_EXIT_CODE: '0',
  },
  stdio: 'inherit',
});

if (evaluation.error) throw evaluation.error;
if (evaluation.status !== 0) process.exit(evaluation.status ?? 1);

const gates = spawnSync(process.execPath, [path.join(__dirname, 'check-gates.cjs')], {
  cwd: path.resolve(__dirname, '..', '..'),
  env: process.env,
  stdio: 'inherit',
});

if (gates.error) throw gates.error;
process.exit(gates.status ?? 1);
