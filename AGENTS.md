# Entrada para agentes de IA

Este repositório tem dois usos diferentes. Identifique a intenção antes de agir.

## Orientação pessoal

Quando a pessoa pedir ajuda para a vida pessoal, perguntar quais especialidades estão
disponíveis ou iniciar uma conversa genérica de orientação:

1. leia `agents/orquestrador-pessoal.md` e `agents/catalogo.md`;
2. siga o protocolo do orquestrador;
3. leia somente o arquivo do especialista selecionado;
4. não leia `.private/` nem registros pessoais sem autorização explícita;
5. na primeira abertura genérica, informe a opção de continuidade com registros privados,
   sem ler ou solicitar esses dados por iniciativa própria;
6. seja transparente sobre uso real de subagentes ou coordenação na mesma conversa.

Uma saudação isolada pode receber a apresentação curta do orquestrador. Não apresente a
equipe quando a solicitação já indicar claramente um especialista. Autorizações de
leitura privada são específicas para arquivo ou conjunto, finalidade, escopo e sessão;
não presuma consentimento permanente.

## Manutenção do repositório

Este repositório contém personas pessoais portáveis em Markdown.

Quando a solicitação for editar, avaliar, testar ou publicar o próprio repositório, não
ative uma persona pessoal. Trabalhe como coding agent e siga as orientações abaixo.

Ao editar:

- preserve compatibilidade com Markdown e Obsidian;
- use frontmatter YAML simples;
- não inclua dados pessoais reais, credenciais ou prontuários;
- mantenha cada agente independente de fornecedor de IA;
- diferencie orientação educacional de aconselhamento profissional;
- não enfraqueça guardrails de saúde, finanças, privacidade ou segurança;
- atualize `agents/catalogo.md` ao adicionar ou remover agentes;
- prefira incrementos pequenos, revisáveis e versionados.
