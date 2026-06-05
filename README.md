# São Francisco Acessibilidade — Web

Front-end do projeto extensionista de inclusão digital para mapeamento colaborativo de barreiras de acessibilidade urbana no bairro São Francisco, Curitiba/PR.

## Stack

- HTML / CSS / JavaScript (página única, sem frameworks)
- Acessibilidade WCAG 2.1 AA

## Contexto

Projeto extensionista acadêmico (UNINTER — Bacharelado em Engenharia da Computação).
ODS relacionados: 03 · 10 · 11

## Como usar

Abra `index.html` diretamente no navegador ou sirva com qualquer servidor estático.

Configure a URL da API em `js/api.js` (variável `API_BASE_URL`).

## Estrutura

```
index.html        # página única com seção de formulário e lista
css/styles.css    # estilos e acessibilidade
js/api.js         # chamadas HTTP à API
js/form.js        # lógica do formulário de report
js/lista.js       # renderização da lista de reports
```

## Branches

- `master` — sempre estável
- `feature/<nome>` — criada a partir da master
