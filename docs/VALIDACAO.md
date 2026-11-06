# Validação CP3 — 06/11/2026

## Conferência do código e conteúdo

- Dez objetos válidos em `dist/perguntas.json`; quatro alternativas, índice correto, explicação e fonte HTTPS em todos.
- Sintaxe de `dist/assets/jogo.js` conferida com `node --check`.
- Revisados validação de nome, contrato JSON, proteção de dupla correção, `textContent`, ordenação estável e tratamento de falhas de armazenamento.
- Contraste calculado pela luminância relativa: texto principal/fundo 12,68:1; texto secundário/fundo 5,50:1; destaque/fundo 4,92:1. Essas combinações superam 4,5:1.
- `alt` do computador, labels, fieldset/legend, foco visível, link de salto e regiões de feedback conferidos no HTML/CSS.

## Testes no site publicado

Executados em Chromium, na versão CP3:

- Nome contendo somente espaços rejeitado.
- Confirmação sem alternativa mostra orientação e move foco ao rádio.
- Seleção com seta do teclado e confirmação com Enter.
- Partida completa: 10/10; explicações/fontes e progresso até a última questão.
- Replay sem recarregar e partida completa com 0/10.
- Ranking ordenado corretamente após as duas partidas.
- Recarregamento e terceira partida preservam resultados anteriores.
- Empate em 10/10 mantém a partida anterior primeiro.
- Layout desktop sem rolagem horizontal: viewport de 1363 px, conteúdo de 1348 px.

## Teste automático reproduzível

A workflow **Validar quiz CP3** executa `tests/quiz.cjs` com Playwright/Chromium. Instala as dependências de teste apenas no ambiente de CI e serve `dist` via HTTP. O jogo publicado permanece sem dependências externas.

Cobertura: nome em branco, ausência de resposta, todas as respostas corretas/incorretas, proteção contra correção duplicada, nome com HTML exibido como texto, ranking, replay, recarga, teclado, falha HTTP seguida de nova tentativa e armazenamento bloqueado. Mede ausência de rolagem horizontal em 320, 375, 768 e 1440 px nas duas páginas.

Resultado: **aprovado**, execução https://github.com/glameiras/cp1---entrega/actions/runs/42311390929.

## Limites

A validação não equivale a certificação de acessibilidade. Leitor de tela, Safari/Firefox e dispositivos móveis físicos devem ser conferidos pelo grupo antes da apresentação. Os papéis individuais no README são uma proposta até o grupo confirmar a participação real. A apresentação presencial e o envio no Blackboard dependem dos integrantes.
