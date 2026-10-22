# Guia do CronoTech para o CP1

## 1. Abrir e revisar

Extraia o ZIP antes de abrir `dist/index.html`. Na página inicial, clique em “Iniciar jornada”. Na tela seguinte, selecione uma alternativa e abra “Ver exemplo de explicação e fonte”. O CP1 não possui correção nem pontuação: isso é intencional.

## 2. Organizar a equipe

Os quatro integrantes e seus RGMs já estão registrados no README. Acordem as responsabilidades reais e atualizem a coluna correspondente. O histórico de participação precisa ser construído pelo próprio grupo, com contribuições reais e identificáveis. Contas informadas para colaboração: PedroRodrigues841, rafaelyudi498 e silva0076. Os convites devem ser enviados pelo administrador e aceitos por cada colega.

## 3. Repositório e histórico

O repositório definido é https://github.com/glameiras/cp1---entrega. Ele é público e recebeu esta base em commits separados. Não é necessário recriá-lo. Os comandos de inicialização abaixo são apenas referência para uma nova cópia; para colaborar no repositório existente, siga a seção 4.

No terminal do VS Code, aberto na pasta extraída, execute as linhas abaixo. Não use estes comandos dentro de outro projeto ou repositório existente.

```bash
git init
git branch -M main
git add README.md .gitignore docs
git commit -m "docs: definir tema, escopo e instrucoes do CronoTech"
git add dist/index.html dist/jogo.html dist/assets
git commit -m "feat: criar paginas e identidade visual do CP1"
git add dist/perguntas.json
git commit -m "data: adicionar tres questoes com explicacao e fontes"
git add .github/workflows/pages.yml
git commit -m "ci: configurar publicacao do site no GitHub Pages"
git remote add origin https://github.com/glameiras/cp1---entrega.git
git push -u origin main
```

Esses commits registram a importação organizada desta base. Eles não substituem as contribuições reais dos integrantes nem provam revisão em grupo. Se o Git pedir sua identidade, configure seu nome e e-mail corretos. Não use nome ou e-mail de outra pessoa.

## 4. Colaboradores e branches

Em Settings → Collaborators → Add people, convide as contas reais dos colegas. Cada colega deve aceitar o convite, clonar o repositório e trabalhar em sua branch.

```bash
git clone https://github.com/glameiras/cp1---entrega.git
cd cp1---entrega
git switch -c feature/revisao-perguntas
```

Após uma alteração real e revisada:

```bash
git add dist/perguntas.json
git commit -m "docs: revisar clareza e fontes das perguntas"
git push -u origin feature/revisao-perguntas
```

Abra um pull request no GitHub, peça revisão a outro integrante e faça o merge após a aprovação. Outras branches sugeridas estão no README.

## 5. Publicar o site

A workflow está em `.github/workflows/pages.yml` e publica somente `dist`.

1. No repositório, entre em Settings → Pages.
2. Na origem de publicação, escolha GitHub Actions.
3. Em Actions, abra “Publicar CronoTech no GitHub Pages”.
4. Se a primeira execução falhou porque Pages ainda não estava habilitado, execute novamente em Run workflow, na branch `main`.
5. Aguarde a conclusão e copie a URL do ambiente `github-pages`.
6. Abra o endereço em janela anônima e verifique página inicial, tela do quiz, estilos e fontes.
7. Registre o endereço real no README e envie a alteração ao repositório.

A configuração preparada não significa que Pages já está ativo. Se a conta ou organização restringir Actions/Pages, o responsável precisará ajustar as permissões ou usar outra hospedagem HTTPS aprovada pelo professor.

## 6. Marcar a entrega

Faça isso somente depois de revisar e integrar todas as alterações finais:

```bash
git switch main
git pull --ff-only origin main
git tag -a cp1-entrega -m "Entrega CP1: estrutura e design do CronoTech"
git push origin cp1-entrega
```

Não sobrescreva uma tag já existente sem alinhar isso com o grupo/professor. A tag deve apontar para a versão final revisada, não para uma base que ainda será modificada.

## 7. Conferência antes de enviar

- Tema História da Tecnologia registrado no README.
- Integrantes e responsabilidades reais preenchidos.
- Todos os integrantes adicionados como colaboradores.
- Histórico de contribuições e revisão do grupo.
- `.gitignore` presente; não enviar `.git`, credenciais ou arquivos temporários.
- Página inicial e tela do quiz acessíveis e com identidade consistente.
- Sem rolagem horizontal em celular; foco visível ao navegar com Tab.
- JSON válido com as três questões e os cinco campos obrigatórios.
- Site público HTTPS verificado em janela anônima.
- Tag `cp1-entrega` criada e enviada.
- Links do repositório e do site enviados no Blackboard até 27/10/2026, conforme os prints.

## Para apresentar em sala

“O CronoTech é um quiz sobre a história da tecnologia, com foco na computação. Escolhemos esse tema para relacionar invenções e acontecimentos ao mundo digital que usamos hoje. No CP1, construímos a identidade visual, a página inicial, a estrutura da tela de jogo e três perguntas com explicações e fontes. Utilizamos HTML e CSS próprios, com navegação por teclado e adaptação para celular. O JSON já segue o formato que será usado no CP2, quando desenvolveremos a correção, o avanço das perguntas e a pontuação.”
