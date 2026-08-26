const { loadCases, toPromptfooTests } = require('./markdown-cases.cjs');

const target = process.env.EVAL_TARGET?.trim();
const grader = process.env.EVAL_GRADER?.trim() || target;
const repeat = Number.parseInt(process.env.EVAL_REPEAT || '1', 10);

if (!target) {
  throw new Error('Defina EVAL_TARGET com um provedor aceito pelo Promptfoo.');
}
if (!Number.isInteger(repeat) || repeat < 1 || repeat > 10) {
  throw new Error('EVAL_REPEAT deve ser um inteiro entre 1 e 10.');
}

module.exports = {
  description: 'Avaliação comportamental reproduzível dos Personal AI Agents',
  prompts: [
    {
      id: 'file://./prompt.json',
      label: 'agente-markdown',
    },
  ],
  providers: [target],
  tests: toPromptfooTests(loadCases(), { grader, repeat }),
  sharing: false,
  tags: {
    suite: 'personal-ai-agents',
    target,
    grader,
  },
};
