# Política de segurança

## Escopo

Este repositório distribui instruções e templates em Markdown. Ele não hospeda modelo de
IA, backend, banco de dados ou cofre de segredos. Ainda assim, falhas nas instruções podem
causar exposição de contexto, agência excessiva, orientação insegura ou enfraquecimento
de guardrails.

São exemplos de problemas de segurança relevantes:

- leitura ou compartilhamento de `.private/` sem autorização específica;
- solicitação ou persistência de credenciais e identificadores completos;
- instrução que permita transação, publicação ou representação indevida da pessoa;
- vazamento de contexto entre agentes, domínios ou sessões;
- injeção de prompt capaz de ignorar guardrails;
- orientação clínica, tributária, jurídica ou financeira que esconda seus limites;
- inclusão acidental de dados pessoais reais no histórico do Git.

## Como relatar

Ao publicar o repositório, habilite o recurso de relato privado de vulnerabilidades do
GitHub. Use esse canal para enviar descrição, impacto, passos de reprodução e sugestão de
correção.

Até que um canal privado esteja configurado, não publique vulnerabilidades exploráveis,
credenciais ou dados pessoais em issues. Entre em contato com o mantenedor pelo canal
privado indicado em seu perfil do GitHub e compartilhe somente evidência sintética.

Relatos de comportamento devem informar, quando possível, agente e versão, ferramenta e
modelo, data, cenário sintético e resposta observada. Não anexe `.private/`, exames,
extratos, declarações, diários ou conversas reais.

## Proteção de dados pessoais

`.private/` e `sessions/private/` são ignorados pelo Git, mas permanecem arquivos em
texto puro. Essa exclusão não protege contra acesso local, backup, sincronização em nuvem,
extensões do editor ou transmissão à ferramenta de IA.

Antes de usar contexto real:

- habilite criptografia do dispositivo e proteja a conta do sistema operacional;
- revise permissões, backups, sincronização, memória e retenção da ferramenta;
- use dados mínimos, mascarados e sem informações desnecessárias de terceiros;
- autorize fonte, finalidade, especialista, escopo e sessão;
- nunca armazene ou envie senha, token, chave, certificado digital ou código de acesso;
- mantenha artefatos gerados com dados pessoais fora do repositório público.

O guia [[docs/contexto-privado-e-continuidade]] detalha organização, autorização e
revisão de fontes.

## Resposta e correção

O mantenedor deve confirmar o recebimento sem expor o relator, avaliar impacto e alcance,
preparar a menor correção segura, executar casos críticos afetados e publicar orientação
de atualização quando necessário. Mudanças de guardrail exigem nova versão do agente e
dos respectivos casos.

## Limites

O projeto reduz riscos por instruções e testes, mas não controla o comportamento do modelo,
as permissões da ferramenta, a segurança do dispositivo nem as políticas do fornecedor.
Orientações continuam sujeitas a revisão humana e validação profissional proporcional ao
risco.
