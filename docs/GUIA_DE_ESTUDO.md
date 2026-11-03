# Guia de estudo — CronoTech CP2

## Como funciona

O navegador carrega `dist/jogo.html`, que importa `dist/assets/jogo.js`. O script usa `fetch("./perguntas.json")` para ler as três questões. Cada questão contém um enunciado, quatro alternativas, o índice correto entre 0 e 3, explicação e fonte HTTPS.

## Funções principais

- `elemento(id)`: localiza um elemento HTML com `document.getElementById`.
- `carregarPerguntas()`: busca o JSON de forma assíncrona com `async/await`, verifica se a resposta HTTP foi bem-sucedida e trata erros com `try/catch`.
- `questaoValida(q)`: valida a estrutura, o índice correto e a fonte de cada questão.
- `iniciarJogo(evento)`: evita o envio padrão do formulário, valida o nome e inicializa os dados da partida.
- `mostrarPergunta()`: cria os radio buttons dinamicamente com `createElement`, `append` e `textContent`; também atualiza a barra de progresso.
- `verificarResposta()`: compara a alternativa selecionada ao índice `resposta`, adiciona um ponto em caso de acerto, mostra a explicação e impede múltiplas confirmações.
- `avancarPergunta()`: move o índice para a próxima pergunta ou chama a tela final.
- `finalizarJogo()`: mostra os pontos e adiciona o resultado ao ranking ordenado.
- `lerRanking()`: recupera os resultados da sessão e ignora dados inválidos.
- `reiniciarJogo()`: restaura o estado inicial sem atualizar a página.

## Conceitos usados

`let` declara valores que mudam. `const` declara referências não reatribuídas. `if` faz decisões. `forEach` percorre alternativas e resultados. `addEventListener` responde a interações. `textContent` evita interpretar nomes como HTML. `sessionStorage` mantém o ranking na aba enquanto a sessão existir. `JSON.parse` e `JSON.stringify` convertem entre texto JSON e objetos JavaScript.

## Perguntas que o professor pode fazer

**Por que usar fetch e não escrever perguntas no JavaScript?** Para separar dados de lógica e facilitar a atualização das questões.

**Qual a diferença entre sessionStorage e localStorage?** O primeiro guarda os dados para a sessão da aba; o segundo persiste entre sessões.

**Como impedir dois pontos na mesma questão?** A variável `respondeu` bloqueia confirmação repetida e os radio buttons ficam desativados.

**Como o jogo reinicia?** O estado é zerado e a tela inicial volta a aparecer sem `location.reload()`.

**Por que usar textContent?** Para inserir os dados como texto e não executar HTML fornecido pelo usuário.

**Quais são as respostas?** 1: Tim Berners-Lee (B); 2: Válvulas eletrônicas (C); 3: Intel 4004 (A). Leia as explicações no JSON para apresentar o contexto histórico.
