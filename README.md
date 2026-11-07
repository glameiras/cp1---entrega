# CronoTech — CP3: entrega final

Quiz educativo de **História da Tecnologia**, com foco em computação e tecnologias digitais. HTML, CSS e JavaScript puro, sem instalação de dependências para jogar.

- **Site:** https://glameiras.github.io/cp1---entrega/
- **Repositório:** https://github.com/glameiras/cp1---entrega
- **Versão final:** `cp3-entrega`. As tags `cp1-entrega` e `cp2-entrega` preservam as etapas anteriores.

## Regras e funcionamento

1. Digite nome ou apelido (até 40 caracteres; somente espaços não são aceitos).
2. Responda às **10 perguntas** na ordem do JSON; selecione uma das quatro alternativas e confirme.
3. Cada acerto vale **1 ponto**, sem desconto por erro e sem limite de tempo. Máximo: **10 pontos**.
4. Após confirmar, a resposta fica bloqueada e aparece feedback com explicação e fonte. Não é possível pontuar duas vezes na mesma questão.
5. Ao terminar, veja resultado e ranking; use **Jogar novamente** para outra partida.

O ranking usa `sessionStorage`: fica na sessão da aba, inclusive após recarregar. Não é global nem compartilhado entre pessoas/dispositivos. Ordenamos pelo percentual de acertos; empates preservam a ordem das partidas. A chave `cronotech.cp3.ranking` separa os resultados do CP2. Se o navegador bloquear o armazenamento, o jogo continua com ranking em memória e aviso ao usuário. Dados inválidos armazenados são descartados. Nomes são inseridos com `textContent`.

## Equipe e papéis

| Integrante | RGM | GitHub | Papel sugerido para revisão/apresentação do CP3 |
| --- | --- | --- | --- |
| Gustavo Lameiras | 43905307 | glameiras | Integração, publicação e demonstração do fluxo |
| Pedro de Oliveira Rodrigues | 46925457 | PedroRodrigues841 | Revisão de perguntas, JSON e fontes |
| Rafael Yudi Tokunaga | 47018372 | rafaelyudi498 | Revisão de layout, responsividade e acessibilidade |
| Felipe Silva | 47218363 | silva0076 | Revisão da lógica, ranking e testes |

**Divisão proposta, a confirmar pelo grupo conforme a participação real.** Não representa autoria comprovada de código. Todos devem estudar o projeto inteiro e apresentar; cada pessoa registra suas próprias contribuições na própria conta.

## Executar localmente (plano B da apresentação)

No VS Code, abra a pasta do projeto e use **Open with Live Server** em `dist/index.html`. Alternativamente, com Python instalado, execute na raiz:

```bash
python -m http.server 8000 --directory dist
```

Abra http://localhost:8000. Não abra por `file://`: o navegador pode bloquear o `fetch` do JSON. Os arquivos visuais e o jogo são locais; os links de fontes exigem internet. Não há build nem bibliotecas de terceiros.

## Organização

- `dist/index.html`: página inicial, tema e marcos históricos.
- `dist/jogo.html`: formulário, perguntas, resultado e ranking.
- `dist/assets/jogo.js`: estado, carregamento/validação do JSON, correção e sessão.
- `dist/assets/style.css`: identidade visual, foco e regras responsivas.
- `dist/perguntas.json`: dez questões com pergunta, quatro alternativas, índice correto de 0 a 3, explicação e fonte HTTPS.
- `.github/workflows/pages.yml`: publica `dist` quando `main` recebe alterações.
- `docs/APRESENTACAO_CP3.md`: roteiro de até cinco minutos e perguntas para estudar.
- `docs/VALIDACAO.md`: verificações e limites da revisão.

## Acessibilidade e qualidade

HTML em pt-BR, títulos hierárquicos, regiões semânticas, link para pular ao conteúdo, texto alternativo no computador ilustrado e ícone decorativo oculto da árvore acessível. Formulário com label; alternativas em `fieldset`/`legend` com rádios nativos. Foco visível em links, botões e campos, inclusive no título da pergunta após avançar. Feedback textual (não depende apenas de cor), `role=status` e erros anunciáveis. Tab navega, setas mudam alternativas, Espaço seleciona e Enter ativa botões.

CSS adapta as colunas ao celular, permite quebra de nomes longos e respeita redução de movimento. A revisão e os testes efetivamente executados estão em `docs/VALIDACAO.md`; a conferência em dispositivos reais e com leitor de tela deve ser feita pelo grupo antes da aula.

## Publicação e entrega

O GitHub Actions publica o conteúdo de `dist` no Pages. A automação `cp3-tag.yml` cria a tag anotada somente no commit cuja mensagem inclui `[cp3-entrega]`, sem sobrescrever uma tag existente. Confira a execução do Pages e os links antes de enviar no Blackboard:

- https://github.com/glameiras/cp1---entrega/tree/cp3-entrega
- https://glameiras.github.io/cp1---entrega/

A apresentação e o envio no Blackboard são realizados pelo grupo.
