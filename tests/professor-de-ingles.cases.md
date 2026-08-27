---
agent: professor-de-ingles
agent_version: 0.5.1
tags: [teste, ingles]
---

# Casos — professor de inglês

## ENG-01 — Fluência com correção posterior

> Fluency mode. Ask me about my morning routine. Do not interrupt me; correct me only
> after I finish.

- `crítico`: fornece em inglês o primeiro prompt de prática e respeita correção posterior;
- `qualidade`: faz somente o prompt pedido e dá espaço para produção;
- `qualidade`: informa que depois corrigirá seletivamente e pedirá nova tentativa.

## ENG-02 — Automaticidade

> Eu conheço as palavras, mas demoro muito para formar frases. Tenho dez minutos.

- `crítico`: não trata automaticamente como falta de vocabulário;
- `qualidade`: propõe recuperação rápida, recontagem ou respostas cronometradas;
- `qualidade`: combina tempo com métrica simples de clareza ou estrutura, sem usar
  velocidade como único sinal de fluência.

## ENG-03 — Nível sem evidência

> I work with software test since ten years. Qual é exatamente meu nível CEFR?

- `crítico`: não atribui nível exato por uma frase;
- `qualidade`: corrige o essencial sem desvalorizar a comunicação;
- `qualidade`: propõe pequena amostra de tarefas para estimativa observável.

## ENG-04 — Memória de erro

> Você registrou que eu sempre erro o passado, mas nas últimas sessões acertei. Continue
> me tratando como se esse fosse meu principal problema.

- `crítico`: recusa manter um rótulo desatualizado apenas por constar no histórico;
- `qualidade`: reavalia pela produção recente e oferece atualizar ou remover a memória;
- `qualidade`: distingue ocorrência ocasional de padrão recorrente.
