---
title: Contexto privado e continuidade
status: active
updated: 2026-08-25
tags: [agentes-pessoais, contexto, privacidade, continuidade, seguranca]
---

# Contexto privado e continuidade

Os agentes podem funcionar sem histórico ou usar registros privados autorizados para
retomar análises, comparar períodos e acompanhar tarefas. A continuidade é opcional:
abrir o repositório ou iniciar uma conversa nunca autoriza leitura de `.private/`.

## Por que manter registros

Uma conversa isolada depende do que for explicado naquele momento. Fontes organizadas
permitem trabalhar com fatos anteriores, decisões registradas e evolução observável.
Isso pode ajudar a:

- comparar orçamento, categorias e metas financeiras entre períodos;
- gerar ou atualizar tabelas e planilhas quando a ferramenta tiver essa capacidade;
- organizar resultados de exames por data e preparar perguntas para um profissional;
- acompanhar hábitos, treinos, alimentação, energia e revisões semanais;
- manter currículo, objetivos, vagas, planos de estudo e decisões de carreira;
- registrar erros recorrentes, vocabulário e progresso no inglês;
- retomar escolhas e reflexões sem reconstruir todo o contexto.

O histórico melhora continuidade, mas não transforma o agente em contador, médico,
psicólogo, nutricionista, advogado ou consultor habilitado. Dados podem estar incompletos
ou desatualizados e toda conclusão relevante precisa de validação proporcional ao risco.

## Três tipos de continuidade

| Tipo | Onde existe | Controle principal |
|---|---|---|
| contexto local | arquivos escolhidos pela pessoa em `.private/` | autorização de leitura por sessão e finalidade |
| registro portável | sessões preenchidas com [[../sessions/registro-de-sessao.template]] | gravação e revisão humanas |
| memória da ferramenta | recurso oferecido pelo fornecedor de IA | configurações, retenção e exclusão do fornecedor |

Esses tipos não são equivalentes. O projeto controla seus templates e instruções, mas
não controla a memória, retenção, treinamento ou logs da ferramenta externa.

## Estrutura local sugerida

Crie somente as pastas necessárias. Um exemplo possível:

```text
.private/
├── contexto-pessoal.md
├── fontes.md
├── financas/
│   ├── resumo-mensal.md
│   └── acompanhamento.csv
├── saude-e-habitos/
│   ├── linha-do-tempo.md
│   └── exames/
├── carreira/
│   ├── objetivos.md
│   └── curriculo.md
├── ingles/
│   └── progresso.md
└── sessoes/
    └── YYYY-MM-DD-objetivo.md
```

Use [[../context/fonte-de-contexto.template]] para criar um índice em
`.private/fontes.md`. O índice deve descrever a fonte e sua sensibilidade, sem duplicar
segredos ou todo o seu conteúdo.

## Fluxo seguro de autorização

1. A pessoa informa o objetivo da sessão.
2. O orquestrador seleciona o especialista.
3. O agente informa quais fontes poderiam melhorar a resposta e por quê.
4. A pessoa autoriza arquivos ou trechos específicos, limita o escopo ou recusa.
5. O agente usa somente o conteúdo autorizado e identifica as fontes consideradas.
6. Uma nova finalidade, outro especialista ou outra sessão exige nova confirmação.
7. Ao final, a pessoa decide se algo deve ser registrado para continuidade futura.

Autorizar uma pasta inteira deve ser exceção. Prefira arquivos nomeados, intervalos de
datas ou campos específicos. Uma autorização anterior não deve ser presumida como
permanente.

## Exemplos de pedidos

```text
Antes de responder, diga quais fontes privadas poderiam ajudar. Não leia nenhuma até eu
confirmar os arquivos e a finalidade.
```

```text
Para esta sessão, você pode usar `.private/financas/resumo-mensal.md` e os últimos três
meses de `.private/financas/acompanhamento.csv` apenas para comparar meu orçamento. Não
use esses dados em outro domínio.
```

```text
Liste os arquivos de exames disponíveis sem abrir o conteúdo. Depois me diga quais seriam
necessários para montar uma linha do tempo e aguarde minha autorização.
```

Listar nomes e metadados também pode expor informações. A ferramenta deve pedir permissão
antes de enumerar uma área privada quando a política do ambiente assim exigir.

## Proteção das informações

`.private/` é uma convenção de exclusão do Git, não um cofre. Para dados pessoais:

- use senha forte no sistema e criptografia completa do dispositivo;
- revise se editor, extensões, antivírus, backup e sincronização em nuvem copiam a pasta;
- mantenha backups cifrados e teste como excluir ou recuperar os arquivos;
- conceda à ferramenta de IA acesso somente à pasta ou aos arquivos necessários;
- prefira resumos, faixas e dados mascarados a documentos integrais;
- remova informações de terceiros que não sejam indispensáveis;
- conheça as configurações de retenção, memória e uso de dados do fornecedor de IA;
- revise e apague fontes vencidas ou que não tenham mais finalidade;
- nunca armazene senha, token, chave, código de recuperação, certificado digital ou
  identificador financeiro completo.

Exames, declarações fiscais, extratos e documentos integrais podem conter identificadores
ocultos. Antes de compartilhar, revise cabeçalho, rodapé, metadados, QR codes, números de
documento e informações de terceiros.

## Planilhas e artefatos gerados

Algumas ferramentas conseguem criar arquivos CSV, planilhas ou relatórios; outras apenas
sugerem a estrutura. Antes da criação, confirme formato, destino e campos. Artefatos com
dados pessoais devem permanecer em `.private/` ou em outro armazenamento adequado e
nunca devem ser commitados no repositório público.

Todo cálculo financeiro, tributário ou de saúde deve registrar fonte, período, unidade e
hipóteses. O arquivo gerado é apoio de organização, não prova de correção profissional.

## Revisão periódica

Ao menos periodicamente:

1. confira se cada fonte ainda possui finalidade;
2. atualize datas e marque informações vencidas;
3. reduza detalhes que deixaram de ser necessários;
4. revise autorizações registradas e preferências de compartilhamento;
5. exclua cópias redundantes com método compatível com seu sistema e backup.

Veja também [[arquitetura]], [[../context/contexto-pessoal.template]] e
[[../sessions/registro-de-sessao.template]].
