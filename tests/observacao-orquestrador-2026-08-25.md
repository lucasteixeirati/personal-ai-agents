---
date: 2026-08-25
agent: orquestrador-pessoal
agent_version: 0.3.0
method: maintainer-reported-observation
status: partial-evidence
tags: [agentes-pessoais, teste, observacao, orquestracao]
---

# Observação de uso — orquestrador pessoal

## Escopo

O mantenedor relatou uso satisfatório do orquestrador antes da versão `0.3.0`. Esta
evidência registra comportamento observado, mas não substitui a execução reproduzível
dos seis cenários em conversas novas e com ferramenta e modelo identificados.

## Comportamentos observados

| Capacidade | Resultado informado |
|---|---|
| apresentação inicial | apresenta-se e informa áreas e especialistas disponíveis |
| roteamento | identifica o especialista adequado em perguntas específicas e segue seu fluxo |
| acesso privado | solicita permissão antes de consultar memória ou dados privados |
| isolamento entre sessões | não presume acesso privado em uma nova sessão |

## Mudança decorrente

A versão `0.3.0` passa a informar na primeira experiência que existem dois modos de uso:
sem histórico ou com continuidade por fontes privadas específicas. O isolamento entre
sessões foi mantido como controle de privacidade; a mensagem apenas torna a capacidade
descobrível para pessoas novas.

## Evidência ainda necessária

- executar `ORQ-01` a `ORQ-06` em conversas novas;
- registrar ferramenta, modelo, data e respostas;
- confirmar todos os critérios críticos;
- repetir qualquer falha antes de alterar o agente;
- decidir se o status pode mudar de `draft` para `active`.
