# Integração prevista para o CP2

O CP1 entrega a estrutura visual, sem lógica de jogo. Esta nota preserva o contrato de dados para a próxima etapa; ela não amplia os requisitos do professor.

## Dados

`dist/perguntas.json` é um array com três objetos. Campos obrigatórios:

| Campo | Tipo | Regra |
| --- | --- | --- |
| pergunta | string | Enunciado não vazio |
| alternativas | string[] | Quatro alternativas não vazias e diferentes |
| resposta | integer | Índice da alternativa correta: 0, 1, 2 ou 3 |
| explicacao | string | Texto explicativo independente das letras A–D |
| fonte | string | URL HTTPS que sustenta o conteúdo |

Gabarito atual: questão 1 = B, questão 2 = C, questão 3 = A. Se embaralhar as alternativas, será necessário preservar a relação com o gabarito. Para uma primeira implementação, mantenha a ordem das alternativas.

## Estrutura já preparada

- `#pergunta`: enunciado no `legend` do `fieldset`.
- `#alternativas`: opções; cada radio tem `name="resposta"` e `value` de 0 a 3.
- `#feedback`: mensagem de resultado, com `role="status"` e `aria-live="polite"`.
- `#confirmar`: botão atualmente desativado.
- `#progresso-texto`: progresso textual; a barra é decorativa e deve acompanhar o texto.

## Comportamento futuro

Carregar o JSON com `fetch`, verificar erros de carregamento, renderizar uma pergunta por vez e habilitar a confirmação somente após a seleção. Confirmar apenas uma vez por pergunta. Após a correção, apresentar explicação e fonte; oferecer um botão separado de avanço. Ao terminar, mostrar acertos e permitir reiniciar. Usar `textContent` para inserir textos e preservar navegação por teclado e foco.

O bloco `<details>` atual é apenas uma demonstração estática. Na versão funcional, substituir esse exemplo pelo feedback da questão atual para não antecipar o gabarito. A tela não deve anunciar que uma alternativa foi corrigida se o usuário apenas a selecionou.

As necessidades mais amplas do Documento de Descoberta do Problema podem orientar evoluções futuras, mas os recursos adicionais devem ser alinhados ao enunciado do CP2.
