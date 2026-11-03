# CronoTech — CP2: lógica e interatividade

Projeto acadêmico de História da Tecnologia. Continuação do CP1, preservado pela tag `cp1-entrega`.

O CP2 é um quiz feito em HTML, CSS e JavaScript puro. Carrega as três perguntas de `dist/perguntas.json` com `fetch`, apresenta uma questão por vez, confere a resposta, explica o gabarito com fonte, computa os pontos e cria um ranking da sessão em `sessionStorage`. É possível jogar novamente sem recarregar a página.

## Executar localmente

Abra esta pasta no VS Code e inicie o Live Server sobre `dist/index.html`. Alternativamente, use na raiz do projeto:

```sh
python -m http.server 5500 --directory dist
```

Acesse http://localhost:5500. É necessário um servidor HTTP, pois `file://` não permite o carregamento do JSON com `fetch` em muitos navegadores.

## Funcionalidades

- Nome obrigatório, com validação de espaços e limite de 40 caracteres.
- Leitura e validação do JSON externo; mensagem e nova tentativa em caso de falha.
- Uma pergunta por vez, com alternativas acessíveis por teclado e foco visível.
- Resposta confirmada apenas uma vez, com explicação e fonte.
- Pontuação de 0 a 3, resultado final e ranking temporário da aba.
- Novo jogo sem atualizar a página; nomes exibidos com segurança como texto.
- Layout responsivo e publicação no GitHub Pages.

## Arquivos principais

- `dist/index.html`: apresentação do projeto.
- `dist/jogo.html`: quiz, placar e ranking.
- `dist/assets/jogo.js`: lógica e eventos.
- `dist/assets/style.css`: estilos.
- `dist/perguntas.json`: perguntas, respostas, explicações e fontes.
- `docs/GUIA_DE_ESTUDO.md`: explicação para a apresentação.
- `docs/ENTREGA.md`: checklist de publicação.
- `docs/VALIDACAO.md`: testes realizados e limites de verificação.

## Equipe

| Integrante | RGM | GitHub |
| --- | --- | --- |
| Gustavo Lameiras | 43905307 | glameiras |
| Pedro de Oliveira Rodrigues | 46925457 | PedroRodrigues841 |
| Rafael Yudi Tokunaga | 47018372 | rafaelyudi498 |
| Felipe Silva | 47218363 | silva0076 |

Cada integrante deve fazer contribuições reais na própria conta. Nenhum commit de colega foi simulado.

## Entrega

- Repositório: https://github.com/glameiras/cp1---entrega
- Site: https://glameiras.github.io/cp1---entrega/
- Tag da etapa CP2: `cp2-entrega`
- Prazo informado: 10/11/2026, valendo 0,8 ponto.

A publicação e a tag devem ser conferidas no GitHub antes da submissão à Blackboard. Testes de navegação em navegador real devem ser feitos pela equipe.
