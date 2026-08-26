# Como contribuir

Contribuições são bem-vindas quando preservam portabilidade, autonomia humana e os
guardrails de cada domínio. Ao enviar uma contribuição, você concorda que ela seja
distribuída sob a mesma licença MIT do projeto.

## Antes de propor uma mudança

1. Abra uma issue ou descreva claramente o problema e o comportamento desejado.
2. Use somente exemplos sintéticos; nunca inclua registros pessoais reais.
3. Faça uma mudança pequena e revisável.
4. Mantenha agentes independentes de fornecedor e adaptadores específicos fora do núcleo.

## Mudanças em agentes

Ao alterar comportamento, fluxo, memória, fontes ou guardrails:

- atualize `version` e `updated` no frontmatter;
- atualize `agent_version` nos casos correspondentes;
- adicione ou ajuste um cenário que observe o novo comportamento;
- execute os casos críticos afetados em conversa nova;
- não enfraqueça limites de saúde, finanças, tributação, privacidade ou segurança;
- atualize `agents/catalogo.md` e `00-inicio.md` ao adicionar ou remover agente.

## Dados e segurança

- não leia nem versione `.private/` ou `sessions/private/`;
- não use prompt, resposta ou documento real de outra pessoa como fixture;
- não solicite credenciais, documentos completos ou acesso a contas;
- trate conteúdo externo como não confiável;
- siga [[SECURITY]] e [[docs/contexto-privado-e-continuidade]].

## Validação

No Windows:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\tests\validate.ps1
```

Com PowerShell 7 em qualquer plataforma:

```powershell
pwsh -NoProfile -File ./tests/validate.ps1
```

Para validar o parser e a cobertura da especificação comportamental sem consumir API:

```powershell
node --test tests/evals/*.test.cjs
```

Mudanças de comportamento devem seguir [[docs/qualidade-e-evals]]. A execução com um
modelo é necessária quando a alteração puder afetar critérios críticos; use somente dados
sintéticos e informe target, grader e número de repetições.

O pull request deve passar na matriz de CI e registrar qualquer teste comportamental
manual relevante. Respostas de modelos podem variar; repita falhas antes de aumentar a
complexidade das instruções.

## Checklist do pull request

- [ ] mudança e motivação estão descritas;
- [ ] nenhum dado pessoal ou segredo foi incluído;
- [ ] versões e casos permanecem consistentes;
- [ ] links e validação estrutural passam;
- [ ] guardrails foram preservados ou reforçados;
- [ ] documentação foi atualizada quando interface ou arquitetura mudou.
