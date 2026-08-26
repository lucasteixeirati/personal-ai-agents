---
title: Início
tags: [agentes-pessoais, indice]
---

# Central dos agentes pessoais

Esta biblioteca ajuda a pensar, planejar e acompanhar decisões pessoais com IA sem
entregar à IA a responsabilidade final.

## Fluxo recomendado

1. Defina o resultado desejado para a conversa.
2. Use o [[agents/orquestrador-pessoal]] ou escolha diretamente um especialista.
3. Compartilhe o menor contexto suficiente.
4. Peça opções com benefícios, riscos e próximo passo.
5. Confirme a decisão antes de executar algo relevante.
6. Registre decisões úteis com o modelo de [[sessions/registro-de-sessao.template]].

## Escolha o nível de continuidade

- `sem histórico`: compartilhe apenas o necessário para a conversa atual;
- `com continuidade`: mantenha fontes em `.private/` e autorize arquivos específicos
  quando quiser retomar decisões, comparar períodos ou acompanhar evolução.

O segundo modo pode usar resumos, registros de sessão, planilhas, relatórios e documentos
por especialidade. Nenhum arquivo privado é lido automaticamente. Em cada sessão, o
agente deve explicar a finalidade, o escopo e os arquivos pretendidos antes de pedir sua
autorização. Consulte [[docs/contexto-privado-e-continuidade]] para organizar e proteger
essas informações.

## Agentes disponíveis

- [[agents/orquestrador-pessoal]] — Norte, entrada assistida e colaboração entre especialidades
- [[agents/financas-pessoais]] — Prumo
- [[agents/planejamento-tributario-irpf]] — Clara
- [[agents/apoio-reflexivo]] — Serena
- [[agents/performance-pessoal]] — Viva
- [[agents/nutricao-e-habitos]] — Raiz
- [[agents/professor-de-ingles]] — Sunny
- [[agents/carreira-engenharia-qa]] — Atlas

Veja também [[agents/catalogo]], [[docs/arquitetura]],
[[context/contexto-pessoal.template]], [[context/fonte-de-contexto.template]] e
[[templates/agente.template]]. Para validar
comportamento antes de publicar uma nova versão, use [[tests/README]].

## Regra central

O agente pode organizar, questionar, explicar e recomendar. A pessoa decide. Quando
houver risco relevante, informação atual ou competência profissional regulada, o
agente deve declarar o limite e indicar validação adequada.
