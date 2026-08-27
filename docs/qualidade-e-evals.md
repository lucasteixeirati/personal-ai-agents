---
title: Qualidade e avaliação dos agentes
status: active
version: 1.1.0
updated: 2026-08-26
tags: [qualidade, testes, evals, agentes-pessoais]
---

# Qualidade e avaliação dos agentes

Os agentes são instruções em Markdown, mas o comportamento observado também depende do
modelo, da ferramenta, das permissões, da memória e da entrada. Uma execução aprovada
oferece evidência para aquela configuração; não certifica todos os modelos ou situações.

## Estratégia

| Camada | Objetivo | Execução |
|---|---|---|
| contrato estático | validar frontmatter, IDs, versões, catálogo e links | automática em todo push e pull request |
| especificação dos evals | garantir que os casos Markdown possam ser executados sem perda de cobertura | automática e sem API |
| comportamento | avaliar cada resposta contra critérios críticos e de qualidade | local ou workflow manual com API |
| exploração humana | revisar nuances, falhas, casos limítrofes e novos riscos | manual |

Os arquivos `tests/*.cases.md` são a fonte única dos cenários. O parser
`tests/evals/markdown-cases.cjs` extrai cenário, agente, versão e critérios sem copiar o
conteúdo para outro formato.

## Gates

- todos os critérios `crítico` devem passar;
- pelo menos 80% de todos os critérios `qualidade` executados devem passar;
- falhas devem ser repetidas antes de alterar um agente;
- uma regressão crítica bloqueia a promoção da versão avaliada;
- para uma release, recomenda-se executar cada caso crítico três vezes.

Os critérios semânticos usam avaliação por modelo. Esse avaliador pode errar ou apresentar
viés; revise todas as falhas, resultados limítrofes e uma amostra dos casos aprovados.

Os critérios críticos continuam bloqueantes dentro de cada caso. Os critérios de qualidade
são coletados sem reprovar isoladamente uma linha; `tests/evals/check-gates.cjs` calcula o
resultado global depois da execução. Resposta inválida do grader ou erro de provedor torna
a rodada `inconclusive`, em vez de ser contado como falha comportamental.

## Validação sem consumir API

Requer Node.js 22.22 ou superior para manter o mesmo ambiente usado pelo Promptfoo:

```powershell
node --test tests/evals/*.test.cjs
```

Essa validação confirma os 34 casos atuais, 44 critérios críticos, 71 critérios de
qualidade, IDs únicos, versões e gates. Ela não chama um modelo de IA.

## Avaliação comportamental local

Instale as dependências fixadas no `package-lock.json` e configure o provedor que será
avaliado. No PowerShell, por exemplo:

```powershell
npm ci
$env:EVAL_TARGET = 'openai:gpt-5-mini'
$env:EVAL_GRADER = 'openai:gpt-5-mini'
$env:EVAL_REPEAT = '1'
$env:OPENAI_API_KEY = 'configure-a-chave-somente-nesta-sessao'
npm run eval:behavior
```

`EVAL_TARGET` identifica o modelo testado. `EVAL_GRADER` pode usar outro modelo ou
fornecedor para reduzir autoavaliação; quando omitido, usa o mesmo valor do target. Use
`EVAL_REPEAT=3` para a rodada de release.

Para repetir somente casos afetados, use uma expressão que corresponda ao ID presente na
descrição do caso:

```powershell
$env:EVAL_FILTER = 'NUT-01|ORQ-02|ORQ-06|IRP-03'
npm run eval:behavior
```

Remova a variável antes da suíte completa:

```powershell
Remove-Item Env:EVAL_FILTER
npm run eval:behavior
```

Uma repetição completa faz 34 chamadas ao target e até 115 avaliações de critérios pelo
grader. Verifique limites e custos do fornecedor antes de aumentar `EVAL_REPEAT`.

O Promptfoo aceita outros provedores. Configure o identificador e a variável de ambiente
de autenticação conforme a documentação do fornecedor, sem colocar credenciais nos
arquivos do projeto.

A dependência está fixada e o lockfile aplica versões corrigidas de duas dependências
transitivas. Ao atualizar o Promptfoo, execute `npm audit` e remova os overrides somente
quando a árvore atualizada continuar sem vulnerabilidades conhecidas.

Os resultados ficam em `tests/results/` nos formatos JSON, HTML e JUnit, junto de
`gate-summary.json`. O diretório é
ignorado pelo Git porque os arquivos podem ser grandes e contêm prompts e respostas.

## GitHub Actions

O workflow `Behavioral evaluation` é iniciado manualmente na aba **Actions**. A pessoa
mantenedora escolhe target, grader, número de repetições e um filtro opcional de casos.
As chaves ficam em
**Settings > Secrets and variables > Actions** e nunca devem ser digitadas como input do
workflow.

O job desabilita telemetria, compartilhamento e geração remota do Promptfoo. As chamadas
ainda são enviadas aos provedores de target e grader escolhidos. Ao terminar, o GitHub
guarda JSON, HTML, JUnit e o resumo dos gates como artefatos por 30 dias.

O comando retorna `0` quando os gates passam, `2` quando o comportamento não atinge as
metas e `1` quando a avaliação é tecnicamente inconclusiva.

## Evidência pública

Uma evidência deve registrar:

- commit, agente e versão;
- target, grader, ferramenta e data;
- quantidade de repetições;
- aprovados, reprovados e erros;
- critérios que falharam e decisão humana;
- limitações conhecidas.

Use somente os dados sintéticos versionados. Revise os relatórios antes de anexá-los a uma
release: resultados automáticos podem conter texto inesperado produzido pelo modelo.

## Próximas técnicas

- variações metamórficas: paráfrases, erros de digitação e contexto irrelevante;
- testes de trajetória do orquestrador e autorização de memória;
- red team para prompt injection e envenenamento de contexto;
- mutation testing removendo guardrails de forma controlada;
- calibração do avaliador automático contra revisão humana.

A primeira rodada completa automatizada e sua triagem humana estão registradas em
`tests/evidencia-eval-completa-2026-08-26.md`.
