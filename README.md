# Personal AI Agents

[![Validate repository](https://github.com/lucasteixeirati/personal-ai-agents/actions/workflows/validate.yml/badge.svg)](https://github.com/lucasteixeirati/personal-ai-agents/actions/workflows/validate.yml)

Conjunto portátil de agentes pessoais em Markdown, compatível com Obsidian e diferentes
ferramentas de IA. Os agentes são independentes de fornecedor e podem ser usados de forma
pontual ou com continuidade por registros privados locais.

## Princípios

- a pessoa continua responsável pelas decisões;
- fatos, hipóteses e recomendações devem ser distinguidos;
- contexto ausente deve gerar perguntas curtas, não suposições silenciosas;
- saúde, finanças e segurança exigem limites explícitos;
- nenhum agente executa transações nem fala em nome da pessoa;
- memória pessoal sensível fica em `.private/`, ignorada pelo Git.

## Comece aqui

1. Abra o guia [00-inicio.md](00-inicio.md).
2. Use o [orquestrador pessoal](agents/orquestrador-pessoal.md) para identificar o agente
   mais adequado ou escolha diretamente um especialista no [catálogo](agents/catalogo.md).
3. Adicione o arquivo escolhido às instruções de sua ferramenta de IA, como ChatGPT/GPT,
   Claude, GitHub Copilot ou outra ferramenta compatível com Markdown.
4. Para ter continuidade entre sessões, copie opcionalmente o modelo
   [contexto-pessoal.template.md](context/contexto-pessoal.template.md) para
   `.private/contexto-pessoal.md` e registre somente o necessário.
5. Autorize apenas o contexto relevante para cada sessão e revise a resposta antes de
   transformá-la em decisão ou ação.

Você não precisa criar contexto privado para experimentar. O projeto funciona em dois
modos:

- `pontual`: cada conversa começa sem histórico e usa somente o que você informar;
- `contínuo`: você mantém registros locais e autoriza fontes específicas quando quiser
  comparar períodos, retomar decisões ou acompanhar uma meta.

## Continuidade com registros privados

Registros bem organizados permitem que os agentes trabalhem com histórico em vez de
depender apenas da conversa atual. Você pode, por exemplo:

- comparar orçamentos e planilhas financeiras entre meses;
- acompanhar metas, hábitos, revisões semanais e decisões anteriores;
- organizar resultados de exames por data para discutir tendências, sem substituir a
  interpretação de um profissional de saúde;
- manter versões de currículo, metas de carreira e planos de estudo;
- registrar erros recorrentes e evolução no inglês;
- retomar reflexões sem reconstruir todo o contexto a cada sessão.

O orquestrador informa essa possibilidade na primeira experiência. Nenhum agente lê
`.private/` automaticamente: em cada sessão, ele deve informar quais arquivos pretende
usar, para qual finalidade e com qual especialista, e pedir sua autorização. A permissão
não é permanente e pode ser recusada ou limitada.

Comece com o [modelo de contexto pessoal](context/contexto-pessoal.template.md) e use o
[modelo de fonte de contexto](context/fonte-de-contexto.template.md) para inventariar
planilhas, relatórios, registros e outras fontes sem copiar segredos para o índice. Veja o
[guia de contexto privado e continuidade](docs/contexto-privado-e-continuidade.md).

> [!CAUTION]
> `.private/` é ignorado pelo Git, mas não é criptografado. Proteja o dispositivo, revise
> backups e sincronizações e conheça a política de retenção da ferramenta de IA antes de
> compartilhar dados pessoais. Nunca armazene senhas, tokens, chaves, códigos de acesso
> ou números completos de documentos, cartões e contas.

## Estrutura

```text
personal-ai-agents/
├── 00-inicio.md
├── agents/              # coordenador e especialistas portáteis
├── adapters/            # entrada manual para ferramentas genéricas
├── context/             # modelos de contexto sem dados reais
├── docs/                # arquitetura e decisões de uso
├── sessions/            # modelo de registro de conversas e decisões
├── templates/           # contrato para novos agentes
├── tests/               # cenários e critérios de avaliação comportamental
└── .private/            # contexto pessoal local, ignorado pelo Git
```

## Uso fora do Obsidian

Os arquivos usam Markdown e frontmatter YAML simples. Em outra ferramenta, envie o
arquivo do agente como instrução de projeto ou cole seu conteúdo no início da
conversa. Os links internos são convenientes no Obsidian, mas não são necessários
para o comportamento da persona.

## Baixar e testar

No GitHub, use **Code → Download ZIP** para uma cópia simples ou clone o repositório com
a URL apresentada pela plataforma. Depois, abra `00-inicio.md` e escolha o ponto de entrada
compatível com sua ferramenta.

Não envie sua pasta `.private/` de volta ao GitHub. Para experimentar com segurança,
comece com dados sintéticos e só depois crie registros pessoais locais mínimos.

## Orquestração e ferramentas

O [orquestrador pessoal](agents/orquestrador-pessoal.md) funciona como entrada assistida:
identifica o objetivo, seleciona um especialista principal e pode integrar um segundo
domínio quando isso mudar a decisão. Ele funciona tanto em uma única conversa quanto com
subagentes reais, sem afirmar delegação quando a ferramenta não oferecer essa capacidade.

Pontos de entrada incluídos:

| Ferramenta | Arquivo |
|---|---|
| Codex e ferramentas compatíveis | `AGENTS.md` |
| Claude Code | `CLAUDE.md` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| ChatGPT e outras ferramentas | [instruções genéricas](adapters/instrucoes-genericas.md) |

Nenhum adaptador carrega `.private/` automaticamente. Veja a
[arquitetura](docs/arquitetura.md) para o protocolo de roteamento, os modos manual,
assistido e multiagente e os limites de confiança. Para continuidade e proteção das fontes
locais, consulte o [guia de contexto privado](docs/contexto-privado-e-continuidade.md).

## Avaliação

Os casos descritos na [documentação de testes](tests/README.md) verificam limites críticos,
qualidade da orientação, memória, fontes e confronto construtivo. Execute-os novamente
após mudanças relevantes no agente ou na ferramenta de IA utilizada.

Para validar a estrutura, as versões e os links no Windows:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\tests\validate.ps1
```

Com PowerShell 7 no Windows, Linux ou macOS:

```powershell
pwsh -NoProfile -File ./tests/validate.ps1
```

O workflow `.github/workflows/validate.yml` executa a mesma validação nos três sistemas
a cada push e pull request. Ele também confirma, sem chamar uma IA, que os 34 cenários e
seus critérios podem ser convertidos para a suíte automatizada.

A avaliação comportamental usa os próprios arquivos Markdown como fonte, aceita provedores
configuráveis e gera relatórios JSON, HTML e JUnit. Ela é opcional porque consome API e
suas respostas variam conforme modelo e runtime. Veja o guia de
[qualidade e avaliações](docs/qualidade-e-evals.md) para executar localmente ou pelo
workflow manual `Behavioral evaluation`.

Os gates públicos exigem 100% dos critérios críticos e pelo menos 80% dos critérios de
qualidade no conjunto executado. Falhas de formato do avaliador são marcadas como execução
inconclusiva, e o workflow permite repetir apenas os casos afetados antes da suíte completa.

A avaliação local de release mais recente cobre os oito agentes e repete seus 34 cenários
três vezes: 102/102 execuções, 132/132 critérios críticos e 87,32% dos critérios de qualidade
passaram, sem erro de provedor. Consulte a
[evidência da avaliação completa](tests/evidencia-eval-completa-2026-08-26.md). A validação
exploratória do mantenedor também confirmou utilidade, continuidade e controle nos oito
agentes, permitindo promover o orquestrador para `active`. As versões podem ser diferentes
porque cada agente evolui e é testado de forma independente.

## Estado

Versão estável com um coordenador e sete especialistas ativos: finanças
pessoais, planejamento tributário para IRPF, apoio reflexivo, performance, nutrição e
musculação, inglês e carreira em Quality Engineering. Eles são pontos de partida
incrementais, não substitutos de profissionais habilitados.

## Segurança, contribuição e publicação

- leia a [política de segurança](SECURITY.md) antes de usar dados pessoais ou relatar uma
  vulnerabilidade;
- siga o [guia de contribuição](CONTRIBUTING.md) para propor agentes, casos ou melhorias;
- respeite o [código de conduta](CODE_OF_CONDUCT.md) nos espaços da comunidade;
- consulte o [changelog](CHANGELOG.md) para acompanhar as versões;
- conheça a [estratégia e as lições de QA](docs/licoes-aprendidas-testes-agentes.md);
- use o [checklist de publicação](docs/checklist-publicacao.md) antes de releases e
  divulgação pública.

## Licença

Este projeto é distribuído sob a licença MIT. Consulte [LICENSE](LICENSE) para conhecer
as permissões, condições e limitações.
