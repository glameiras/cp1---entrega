# Apresentação CronoTech — até 5 minutos

## 0:00–0:40 — Tema e objetivo

Apresente a página inicial: “O CronoTech ensina História da Tecnologia por meio de um quiz. Escolhemos o tema para relacionar as invenções da computação com o mundo digital de hoje. No CP3 ampliamos o banco para dez perguntas com explicações e fontes.”

## 0:40–2:10 — Demonstração

Digite um nome, inicie e responda uma questão certa e outra errada. Mostre o feedback e a fonte. Avance pelas demais questões para chegar ao resultado (ensaie antes para caber no tempo). Mostre os pontos, ranking e replay. Explique que cada acerto vale um ponto, até dez. O ranking é apenas da sessão da aba.

## 2:10–3:15 — Organização do código

Abra `dist/perguntas.json`: pergunta, alternativas, índice da resposta começando em zero, explicação e fonte. Em `jogo.js`, mostre `carregarPerguntas`, `mostrarPergunta`, `verificarResposta`, `finalizarJogo` e `reiniciarJogo`. O HTML estrutura, o CSS apresenta e o JavaScript controla o comportamento.

## 3:15–4:15 — Qualidade

Demonstre Tab, foco e seleção por setas. Mostre a versão estreita. Explique validação de nome, tratamento de falha ao buscar JSON, bloqueio de dupla pontuação e uso de `textContent`. Não declare testes que o grupo não fez.

## 4:15–5:00 — Entrega

Mostre README, link publicado e tag `cp3-entrega`. Explique que a tag identifica a versão entregue. Cada integrante relata sua contribuição real, sem atribuir a si trabalho que não fez. Todos precisam estar aptos a explicar qualquer parte.

## Perguntas prováveis

- **Como funciona o ranking?** Um array recebe cada partida, é ordenado por percentual de acertos e salvo como JSON no `sessionStorage`. Empates mantêm a ordem de entrada.
- **Por que não localStorage?** Mantivemos a regra do CP2: ranking temporário da sessão da aba.
- **O que faz fetch?** Busca `perguntas.json` por HTTP; `await resposta.json()` converte o conteúdo em dados JavaScript.
- **Como impede pontos duplicados?** `respondeu` bloqueia uma segunda correção; os rádios ficam desabilitados.
- **Por que usar textContent?** Para exibir entradas como texto, sem interpretar HTML.
- **Como funciona replay?** Zera índice, pontuação e estado da partida, volta ao formulário e preserva ranking; não recarrega a página.
- **Qual foi a dificuldade?** Expliquem a dificuldade real. Um ponto técnico para estudar é a sincronização entre estado, tela, feedback e pontuação.
- **Como adiciona pergunta?** Acrescenta objeto com os cinco campos no JSON, quatro alternativas e gabarito de 0 a 3. A lógica usa o tamanho do array.
- **Web e internet são iguais?** Não. A Web usa a infraestrutura da internet para disponibilizar páginas e links.

## Antes da aula

Abra o site e o servidor local. Para zerar somente este ranking no console: `sessionStorage.removeItem('cronotech.cp3.ranking')`, depois recarregue. Ensaiem o percurso completo e a divisão de falas. Levem uma cópia local do repositório.
