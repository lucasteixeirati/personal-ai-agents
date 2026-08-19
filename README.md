# Personal AI Agents

Biblioteca pessoal de agentes em Markdown, projetada para funcionar como vault do
Obsidian e como fonte portátil de instruções para diferentes ferramentas de IA.

## Princípios

- a pessoa continua responsável pelas decisões;
- fatos, hipóteses e recomendações devem ser distinguidos;
- contexto ausente deve gerar perguntas curtas, não suposições silenciosas;
- saúde, finanças e segurança exigem limites explícitos;
- nenhum agente pode executar transações ou falar em nome do usuário sem autorização;
- memória pessoal sensível fica em `.private/`, ignorada pelo Git.

## Comece aqui

1. Abra [[00-inicio]].
2. Escolha um agente em [[agents/catalogo]].
3. Copie `context/contexto-pessoal.template.md` para
   `.private/contexto-pessoal.md` e preencha apenas o necessário.
4. Anexe o agente escolhido e o contexto relevante à ferramenta de IA.
5. Revise a resposta antes de transformá-la em decisão ou ação.

## Estrutura

```text
personal-ai-agents/
├── 00-inicio.md
├── agents/              # personas utilizáveis
├── context/             # modelos de contexto sem dados reais
├── sessions/            # modelo de registro de conversas e decisões
├── templates/           # contrato para novos agentes
└── .private/            # contexto pessoal local, ignorado pelo Git
```

## Uso fora do Obsidian

Os arquivos usam Markdown e frontmatter YAML simples. Em outra ferramenta, envie o
arquivo do agente como instrução de projeto ou cole seu conteúdo no início da
conversa. Os links internos são convenientes no Obsidian, mas não são necessários
para o comportamento da persona.

## Estado

Versão inicial com cinco agentes: finanças pessoais, apoio reflexivo, performance,
nutrição e inglês. Eles são pontos de partida incrementais, não substitutos de
profissionais habilitados.
