# CronoTech — CP2: lógica e interatividade

Projeto acadêmico de História da Tecnologia. Continuação do CP1, preservado pela tag `cp1-entrega`.

O CP2 é um quiz feito em HTML, CSS e JavaScript puro. Carrega as três perguntas de `dist/perguntas.json` com `fetch`, apresenta uma questão por vez, confere a resposta, explica o gabarito com fonte, computa os pontos e cria um ranking da sessão em `sessionStorage`. É possível jogar novamente sem recarregar a página.

## Funcionalidades

- Nome obrigatório, com validação de espaços e limite de 40 caracteres.
- Leitura e validação do JSON externo; mensagem e nova tentativa em caso de falha.
- Uma pergunta por vez, com alternativas acessíveis por teclado e foco visível.
- Resposta confirmada apenas uma vez, com explicação e fonte.
- Pontuação de 0 a 3, resultado final e ranking temporário da aba.
- Novo jogo sem atualizar a página; nomes exibidos com segurança como texto.
- Layout responsivo e publicação no GitHub Pages.

## Equipe

| Integrante | RGM | GitHub |
| --- | --- | --- |
| Gustavo Lameiras | 43905307 | glameiras |
| Pedro de Oliveira Rodrigues | 46925457 | PedroRodrigues841 |
| Rafael Yudi Tokunaga | 47018372 | rafaelyudi498 |
| Felipe Silva | 47218363 | silva0076 |

Cada integrante deve fazer contribuições reais na própria conta. Nenhum commit de colega foi simulado.

## Links úteis

- Repositório: https://github.com/glameiras/cp1---entrega
- Site: https://glameiras.github.io/cp1---entrega/
- Tag da etapa CP2: `cp2-entrega`
