const fs = require('node:fs');
const path = require('node:path');

const [major, minor] = process.versions.node.split('.').map(Number);
if (major < 22 || (major === 22 && minor < 22)) {
  throw new Error(`Node.js 22.22 ou superior é necessário; versão atual: ${process.version}`);
}
if (!process.env.EVAL_TARGET?.trim()) {
  throw new Error(
    'Defina EVAL_TARGET. Exemplo: $env:EVAL_TARGET="openai:gpt-5-mini" no PowerShell.',
  );
}

fs.mkdirSync(path.resolve(__dirname, '..', 'results'), { recursive: true });
console.log(`Target: ${process.env.EVAL_TARGET}`);
console.log(`Grader: ${process.env.EVAL_GRADER || process.env.EVAL_TARGET}`);
console.log(`Repetições: ${process.env.EVAL_REPEAT || '1'}`);
console.log(`Filtro: ${process.env.EVAL_FILTER?.trim() || 'suíte completa'}`);
