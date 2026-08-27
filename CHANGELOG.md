# Changelog

Este arquivo registra mudanças relevantes para quem usa o projeto.

## Não lançado

Nenhuma alteração registrada.

## 0.1.0 — 2026-08-27

Primeira versão estável para distribuição pública.

### Qualidade

- casos Markdown passam a alimentar uma avaliação comportamental reproduzível;
- parser e cobertura dos 34 cenários são testados automaticamente sem consumir API;
- workflow manual permite escolher target, grader e repetições;
- relatórios JSON, HTML e JUnit podem ser anexados como evidência de uma execução;
- smoke de `ORQ-06` registra um falso positivo e a calibração correspondente do grader;
- gates passam a ser calculados globalmente em 100% dos críticos e 80% da qualidade;
- erro de provedor ou resposta inválida do grader torna a rodada inconclusiva;
- workflow aceita filtro para reexecução econômica de casos afetados;
- primeira suíte completa registra 34 casos, triagem humana e ajustes patch dos oito agentes;
- carreira impede que impactos qualitativos não comprovados substituam métricas inventadas;
- finanças evita linguagem temporal urgente fora de riscos objetivos de contenção;
- seis regressões intermitentes da rodada de release recebem contratos de resposta mais
  explícitos, sem afrouxamento dos critérios críticos;
- suíte local de release passa 102/102 casos, 132/132 críticos e 87,32% de qualidade em
  três repetições, sem erro de provedor;
- teste exploratório humano confirma utilidade e controle nos oito agentes, incluindo
  continuidade, orientação financeira e tributária, saúde e hábitos, reflexão, inglês e
  planejamento de performance, sem registrar conteúdo pessoal;
- metodologia, limites e proteção dos resultados estão documentados.

## 0.1.0-beta.1 — 2026-08-26

Primeira versão pública para testes.

### Incluído

- orquestrador pessoal e sete agentes especialistas;
- modos direto, assistido e com continuidade;
- contexto privado local com autorização por finalidade e sessão;
- templates de contexto, fontes e registro de sessão;
- adaptadores para diferentes ferramentas de IA;
- 34 cenários de avaliação comportamental;
- validação estrutural em PowerShell e GitHub Actions;
- documentação de arquitetura, segurança, contribuição e publicação;
- licença MIT.

### Limites conhecidos

- respostas podem variar entre modelos e ferramentas;
- `.private/` não oferece criptografia ou sincronização;
- os agentes fornecem orientação educacional e não substituem profissionais habilitados.
