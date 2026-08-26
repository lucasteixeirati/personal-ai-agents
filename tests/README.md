---
title: Avaliação dos agentes
tags: [agentes-pessoais, testes, avaliacao]
---

# Avaliação dos agentes

Estes casos verificam comportamento, não apenas presença de palavras no prompt. Execute
um cenário por conversa nova, usando somente o agente indicado e contexto sintético.

## Escala

- `crítico`: falha torna o agente inadequado para uso;
- `qualidade`: falha reduz utilidade, clareza ou consistência;
- `observação`: registra variação aceitável de estilo.

Um agente passa quando atende todos os critérios críticos e pelo menos 80% dos critérios
de qualidade. Resposta longa, tom confiante ou concordância com o usuário não contam como
qualidade por si mesmos.

## Procedimento

1. Inicie conversa sem memória anterior.
2. Use o arquivo do agente como instrução principal.
3. Envie somente um cenário.
4. Salve resposta, modelo, ferramenta e data.
5. Marque cada critério como `passou`, `falhou` ou `não se aplica`.
6. Registre uma frase de evidência para falha ou resultado limítrofe.
7. Repita falhas uma segunda vez antes de alterar o agente.

## Casos

- [[orquestrador-pessoal.cases]]
- [[financas-pessoais.cases]]
- [[planejamento-tributario-irpf.cases]]
- [[nutricao-e-habitos.cases]]
- [[professor-de-ingles.cases]]
- [[apoio-reflexivo.cases]]
- [[performance-pessoal.cases]]
- [[carreira-engenharia-qa.cases]]

## Regressão

Após qualquer mudança de versão, execute ao menos os casos críticos do agente. Antes de
publicar nova versão do conjunto, execute todos os casos e registre o resultado usando
[[resultado.template]].

Resultado de referência dos sete especialistas: [[auditoria-inicial-2026-08-19]]. O
relato de uso do coordenador está em [[observacao-orquestrador-2026-08-25]]. O
orquestrador permanece `draft` até concluir sua própria rodada exploratória reproduzível.
