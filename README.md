# CronoTech — História da Tecnologia

Projeto acadêmico do **CP1: estrutura e design de um quiz**, com o tema História da Tecnologia e recorte em história da computação e tecnologias digitais. A proposta é apresentar acontecimentos, invenções e pessoas que contribuíram para o mundo digital, contextualizando as respostas com fontes verificáveis.

**Etapa atual:** protótipo estático em HTML e CSS. A lógica de jogo pertence ao CP2 e não está implementada nesta entrega.

## Público-alvo

Estudantes iniciantes de cursos de tecnologia e pessoas interessadas em conhecer a evolução da computação. A linguagem é introdutória e o acesso não exige cadastro.

## O que está implementado

- Página inicial com nome, descrição do tema e chamada para iniciar.
- Tela do quiz com pergunta modelo, quatro alternativas, indicador visual de progresso e área de feedback.
- Seleção nativa de alternativas com botões de rádio; não há correção automática.
- Exemplo estático de explicação e fonte em painel expansível.
- Três questões em `dist/perguntas.json`, no contrato sugerido pelo professor.
- HTML semântico, link para pular ao conteúdo, foco visível e layout responsivo.
- CSS próprio, ilustração SVG original e ícone local, sem dependências externas.
- Configuração de publicação via GitHub Actions/GitHub Pages.

**Não implementado no CP1:** leitura dinâmica do JSON, comparação de respostas, avanço entre perguntas, pontuação, tela de resultado e persistência. O indicador “Pergunta 1 de 3” é uma representação fixa. O botão de confirmar permanece desativado e informa o motivo.

## Tecnologias e identidade visual

HTML5, CSS3, JSON e SVG. Não são usados frameworks, bibliotecas ou JavaScript de jogo.

A identidade combina o estilo de um arquivo histórico com referências a terminais antigos. Cores: papel `#F3F1E9`, verde escuro `#132E32`, terracota `#B83F23` e verde claro `#D3E7B8`. Tipografia: Arial/Helvetica para texto e Courier New para datas e metadados. As fontes são locais ao sistema. Layout com Grid e Flexbox, adaptado por media queries.

## Estrutura

- `dist/index.html` — página inicial.
- `dist/jogo.html` — estrutura visual do quiz.
- `dist/perguntas.json` — três questões modelo.
- `dist/assets/style.css` — estilos compartilhados.
- `dist/assets/computador.svg` — ilustração original.
- `dist/assets/favicon.svg` — ícone da aba.
- `docs/GUIA_DE_ENTREGA.md` — execução, Git, publicação e pendências.
- `docs/CONTRATO_CP2.md` — formato de dados e pontos de integração.
- `.github/workflows/pages.yml` — publicação do diretório `dist`.
- `.gitignore` — exclusões de arquivos locais e temporários.

## Requisitos mínimos e execução

Um navegador moderno e os arquivos do projeto extraídos. Não é necessário instalar pacotes.

1. Baixe e extraia o ZIP.
2. Abra `dist/index.html` no navegador.
3. Use “Iniciar jornada” para abrir a tela do quiz.

Opcionalmente, abra a pasta no VS Code e utilize a extensão Live Server sobre `dist/index.html`. Se tiver Python instalado, execute na pasta do projeto:

```bash
python -m http.server 5500 --directory dist
```

Acesse `http://localhost:5500`. No Windows, `py` pode substituir `python`. No CP2, use um servidor HTTP para o carregamento de JSON com `fetch`.

## Contrato do JSON

O arquivo é um array. Cada objeto possui `pergunta` (texto), `alternativas` (array com quatro textos), `resposta` (índice inteiro de 0 a 3), `explicacao` (texto) e `fonte` (URL HTTPS).

**A resposta começa em zero:** 0 = A, 1 = B, 2 = C, 3 = D. A primeira questão do JSON corresponde ao exemplo fixo de `jogo.html`. Consulte `docs/CONTRATO_CP2.md` antes de desenvolver a lógica.

## Fontes das questões

Fontes consultadas em 22/10/2026. As explicações foram redigidas para este projeto; a ilustração não é uma fotografia histórica.

1. [CERN — The birth of the Web](https://home.cern/science/computing/the-birth-of-the-web): Tim Berners-Lee e a proposta da Web em 1989.
2. [Computer History Museum — 1946](https://www.computerhistory.org/timeline/1946/): ENIAC e suas válvulas eletrônicas.
3. [Computer History Museum — 1971](https://www.computerhistory.org/timeline/1971/): Intel 4004.

## Integrantes e organização

| Integrante | RGM | GitHub |
| --- | --- | --- |
| Gustavo Lameiras | 43905307 | @glameiras |
| Pedro de Oliveira Rodrigues | 46925457 | @PedroRodrigues841 |
| Rafael Yudi Tokunaga | 47018372 | @rafaelyudi498 |
| Felipe Silva | 47218363 | @silva0076 |

Os integrantes e RGMs foram informados pela equipe. A divisão de tarefas ainda deverá ser acordada pelo grupo. Cada integrante deverá contribuir com sua própria conta, em sua branch; não simular commits de colegas.

Branches sugeridas: `feature/pagina-inicial`, `feature/tela-jogo`, `feature/estilo-base` e `feature/perguntas-json`. Revisar alterações antes de integrá-las à `main`.

- Link do repositório GitHub: https://github.com/glameiras/cp1---entrega.


## Site publicado

Acesse o [CronoTech no GitHub Pages](https://glameiras.github.io/cp1---entrega/).

Publicação automática via GitHub Actions, a partir da pasta `dist` da branch `main`.
