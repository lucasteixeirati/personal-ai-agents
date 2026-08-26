---
title: Instruções para ferramentas genéricas
tags: [agentes-pessoais, adaptador, portabilidade]
---

# Instruções para ferramentas genéricas

Use este modo quando a ferramenta não carregar instruções do repositório automaticamente.

1. Anexe ou cole `agents/orquestrador-pessoal.md` e `agents/catalogo.md`.
2. Informe à IA que o orquestrador é a instrução principal da conversa.
3. Permita que ela leia ou anexe somente o arquivo do especialista selecionado.
4. Compartilhe conteúdo de `.private/` apenas depois de confirmar arquivo, finalidade e
   escopo.
5. Se quiser continuidade, informe que existem fontes privadas, mas peça que a IA sugira
   quais seriam úteis antes de anexar ou autorizar qualquer conteúdo.

Prompt curto sugerido:

```text
Use o orquestrador e o catálogo anexados para entender meu objetivo. Informe qual
especialista será aplicado e por quê. Se você puder ler arquivos, carregue somente o
agente selecionado; caso contrário, peça que eu o anexe. Não leia contexto privado nem
afirme ter executado subagentes sem minha autorização e sem capacidade real. Informe que
posso trabalhar sem histórico ou autorizar fontes privadas específicas para continuidade;
toda autorização deve indicar arquivo, finalidade, especialista e sessão.
```

Para escolher manualmente, use o modo `direto` e anexe um arquivo de `agents/` sem passar
pela triagem. Essa alternativa é parte oficial da arquitetura, não um modo degradado.

Veja [[../docs/contexto-privado-e-continuidade]] para organizar fontes, proteger dados e
entender a diferença entre arquivos locais, registros de sessão e memória da ferramenta.
