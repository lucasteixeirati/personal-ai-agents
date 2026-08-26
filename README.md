# Personal AI Agents

[![Validate repository](https://github.com/lucasteixeirati/personal-ai-agents/actions/workflows/validate.yml/badge.svg)](https://github.com/lucasteixeirati/personal-ai-agents/actions/workflows/validate.yml)

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
2. Descreva o objetivo ao [[agents/orquestrador-pessoal]] ou escolha diretamente um
   especialista em [[agents/catalogo]].
3. Copie `context/contexto-pessoal.template.md` para
   `.private/contexto-pessoal.md` e preencha apenas o necessário.
4. Anexe o agente escolhido e o contexto relevante à ferramenta de IA.
5. Revise a resposta antes de transformá-la em decisão ou ação.

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

Comece com [[context/contexto-pessoal.template]] e use
[[context/fonte-de-contexto.template]] para inventariar planilhas, relatórios, registros
e outras fontes sem copiar segredos para o índice. Veja o guia completo em
[[docs/contexto-privado-e-continuidade]].

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

O [[agents/orquestrador-pessoal]] funciona como entrada assistida: identifica o objetivo,
seleciona um especialista principal e pode integrar um segundo domínio quando isso mudar
a decisão. Ele funciona tanto em uma única conversa quanto com subagentes reais, sem
afirmar delegação quando a ferramenta não oferecer essa capacidade.

Pontos de entrada incluídos:

| Ferramenta | Arquivo |
|---|---|
| Codex e ferramentas compatíveis | `AGENTS.md` |
| Claude Code | `CLAUDE.md` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| ChatGPT e outras ferramentas | [[adapters/instrucoes-genericas]] |

Nenhum adaptador carrega `.private/` automaticamente. Veja [[docs/arquitetura]] para o
protocolo de roteamento, os modos manual, assistido e multiagente e os limites de confiança.
Para continuidade e proteção das fontes locais, veja
[[docs/contexto-privado-e-continuidade]].

## Avaliação

Os casos em [[tests/README]] verificam limites críticos, qualidade da orientação,
memória, fontes e confronto construtivo. Execute-os novamente após mudanças relevantes
no agente ou na ferramenta de IA utilizada.

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
suas respostas variam conforme modelo e runtime. Veja [[docs/qualidade-e-evals]] para
executar localmente ou pelo workflow manual `Behavioral evaluation`.

A rodada exploratória mais recente cobre os sete especialistas e seus 28 cenários. O
orquestrador possui seis cenários e observações positivas de uso, mas permanece em `draft`
até que uma rodada com runtime, modelo e respostas arquivadas conclua sua evidência. As
versões podem ser diferentes porque cada agente evolui e é testado de forma independente.

## Estado

Versão beta com um coordenador em `draft` e sete especialistas ativos: finanças
pessoais, planejamento tributário para IRPF, apoio reflexivo, performance, nutrição e
musculação, inglês e carreira em Quality Engineering. Eles são pontos de partida
incrementais, não substitutos de profissionais habilitados.

## Segurança, contribuição e publicação

- leia [[SECURITY]] antes de usar dados pessoais ou relatar uma vulnerabilidade;
- siga [[CONTRIBUTING]] para propor agentes, casos ou melhorias;
- respeite [[CODE_OF_CONDUCT]] nos espaços da comunidade;
- consulte [[CHANGELOG]] para acompanhar as versões;
- use [[docs/checklist-publicacao]] antes de releases e divulgação pública.

## Licença

Este projeto é distribuído sob a licença MIT. Consulte [LICENSE](LICENSE) para conhecer
as permissões, condições e limitações.
