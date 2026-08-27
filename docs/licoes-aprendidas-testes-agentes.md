---
title: Lições aprendidas ao testar agentes em Markdown
status: active
version: 1.0.0
updated: 2026-08-27
tags: [qualidade, testes, evals, llm, qa]
---

# Lições aprendidas ao testar agentes em Markdown

Arquivos Markdown definem instruções, mas a unidade testada é o conjunto formado por
instruções, modelo, ferramenta, contexto, permissões e entrada. Uma aprovação é evidência
para essa configuração e não uma garantia determinística de respostas futuras.

## O que funcionou

- cenários sintéticos versionados tornaram comportamentos esperados revisáveis;
- critérios críticos separados dos critérios de qualidade impediram que uma boa média
  escondesse uma falha de segurança;
- três repetições revelaram falhas intermitentes que uma execução única não mostrou;
- leitura humana das respostas distinguiu defeitos reais, falsos positivos e falhas do
  avaliador;
- regressões direcionadas reduziram custo antes da suíte completa;
- teste exploratório com tarefas reais confirmou utilidade, abertura e controle depois do
  endurecimento dos guardrails, sem versionar dados ou respostas pessoais.

## Principais riscos observados

- otimizar somente para segurança pode tornar respostas rígidas ou cautelosas demais;
- critérios muito específicos podem favorecer uma frase esperada e punir outra solução
  válida;
- usar o mesmo modelo como target e grader pode criar viés correlacionado;
- uma suíte formada apenas por casos adversariais não mede criatividade, profundidade,
  confronto construtivo nem utilidade cotidiana;
- mudar prompt, versão do modelo, runtime ou permissões exige nova regressão.

## Estratégia adotada

1. validação estática de estrutura, versões, catálogo e cenários;
2. avaliação comportamental repetida com gates de 100% dos critérios críticos e pelo menos
   80% dos critérios de qualidade;
3. triagem humana das falhas e de uma amostra dos casos aprovados;
4. regressão dos agentes alterados e, depois, da suíte completa;
5. exploração humana de tarefas reais antes da promoção da release.

Para respostas abertas, avalie propriedades e resultados, não um texto exato. Registre
commit, versões dos agentes, target, grader, repetições e ambiente. Quando possível, use
comparação pareada entre versões e calibre o grader automático com julgamento humano.

## Cobertura que deve evoluir

- paráfrases, erros de digitação e contexto irrelevante;
- conversas de vários turnos e continuidade com memória autorizada;
- taxa de recusa ou cautela desnecessária;
- utilidade, criatividade, clareza, confronto e esforço exigido da pessoa;
- comparação A/B ao simplificar prompts ou trocar de modelo;
- prompt injection, envenenamento de contexto e remoção controlada de guardrails.

## Referências

- [OpenAI — Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
- [Anthropic — Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- [Promptfoo — Assertions and metrics](https://www.promptfoo.dev/docs/configuration/expected-outputs/)
- [Inspect — Tasks](https://inspect.aisi.org.uk/tasks.html)
- [NIST AI 600-1 — Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)

Os cenários executáveis estão em `tests/*.cases.md` e a primeira evidência completa em
`tests/evidencia-eval-completa-2026-08-26.md`.
