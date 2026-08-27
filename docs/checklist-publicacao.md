---
title: Checklist de publicação
status: active
updated: 2026-08-27
tags: [publicacao, github, release, comunidade]
---

# Checklist de publicação

Use esta lista antes de tornar o repositório público e antes de cada divulgação ampla.

## Bloqueadores

- [x] escolher e adicionar a licença MIT em `LICENSE`;
- [x] revisar todo o histórico do Git em busca de dados pessoais ou segredos;
- [x] executar os seis casos do orquestrador na ferramenta de referência;
- [x] arquivar runtime, modelo, respostas e decisão por critério dos seis casos;
- [x] confirmar que a matriz do GitHub Actions passa em Windows, Linux e macOS;
- [x] habilitar o relato privado de vulnerabilidades no GitHub;
- [x] revisar README, limites profissionais e guia de dados privados como uma pessoa nova.

## Configuração do repositório

- [ ] definir descrição curta e URL do projeto;
- [ ] adicionar tópicos como `ai-agents`, `personal-ai`, `prompt-engineering`, `obsidian`,
  `privacy-by-design` e `pt-br`;
- [x] criar imagem de compartilhamento social sem dados pessoais em `.github/social-preview.png`;
- [ ] habilitar issues e escolher se Discussions será usado para feedback;
- [ ] proteger a branch principal e exigir a validação antes de merge;
- [ ] conferir o perfil de comunidade do GitHub;
- [x] adicionar código de conduta antes de aceitar uma comunidade ampla de contribuidores.

## Release inicial

- [x] definir uma versão do produto separada das versões individuais dos agentes;
- [x] criar release de prévia e promover a versão estável após validar o orquestrador;
- [x] resumir capacidades, ferramentas testadas, limitações e riscos conhecidos;
- [ ] executar o workflow comportamental e anexar seus artefatos à release;
- [ ] anexar ou apontar instruções claras para baixar via ZIP ou clonar com Git;
- [ ] informar que `.private/` nunca deve ser enviado ao GitHub;
- [ ] oferecer um caminho curto para feedback com exemplos sintéticos.

## Divulgação no LinkedIn

- [ ] explicar o problema: agentes pessoais perdem contexto ou ficam presos a uma ferramenta;
- [ ] mostrar a proposta: agentes portáteis, especializados e com privacidade por padrão;
- [ ] demonstrar os modos pontual e contínuo sem exibir dados reais;
- [ ] incluir uma captura da arquitetura ou do catálogo;
- [ ] deixar claro que o projeto é experimental e não substitui profissionais;
- [ ] incluir link da release, instrução de teste e pedido de feedback específico;
- [ ] nunca publicar exames, finanças, diários, prompts privados ou nomes de terceiros.

## Depois da divulgação

- [ ] acompanhar issues de segurança e regressões críticas primeiro;
- [ ] registrar ferramenta, modelo, versão e cenário nos relatos de comportamento;
- [ ] agrupar feedback por agente e não ajustar prompts com base em um único resultado;
- [ ] publicar changelog e repetir os casos críticos antes de cada nova release.
