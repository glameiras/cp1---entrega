"use strict";

// Estado da partida: variáveis que mudam enquanto a pessoa joga.
let perguntas = [];
let perguntaAtual = 0;
let pontuacao = 0;
let nomeJogador = "";
let respondeu = false;
let fase = "inicio";
let ranking = [];
let armazenamentoDisponivel = true;
const CHAVE_RANKING = "cronotech.cp2.ranking";

// Atalho para encontrar elementos pelo id no HTML.
const elemento = (id) => document.getElementById(id);

// Eventos são registrados uma única vez, inclusive ao reiniciar.
elemento("form-inicio").addEventListener("submit", iniciarJogo);
elemento("confirmar").addEventListener("click", verificarResposta);
elemento("proxima").addEventListener("click", avancarPergunta);
elemento("reiniciar").addEventListener("click", reiniciarJogo);
elemento("tentar").addEventListener("click", carregarPerguntas);

lerRanking();
carregarPerguntas();

// Busca as questões no arquivo externo; não há perguntas fixas neste script.
async function carregarPerguntas() {
    elemento("jogar").disabled = true;
    elemento("tentar").hidden = true;
    elemento("carregamento").textContent = "Carregando perguntas…";
    try {
        const resposta = await fetch("./perguntas.json");
        if (!resposta.ok) throw new Error("Falha HTTP: " + resposta.status);
        const dados = await resposta.json();
        if (!Array.isArray(dados) || dados.length === 0 || !dados.every(questaoValida)) {
            throw new Error("Formato inválido no perguntas.json");
        }
        perguntas = dados;
        elemento("carregamento").textContent = `${perguntas.length} perguntas prontas. Boa jornada!`;
        elemento("jogar").disabled = false;
    } catch (erro) {
        console.error(erro);
        elemento("carregamento").textContent = "Não foi possível carregar as perguntas. Abra pelo Live Server ou pelo site publicado e tente novamente.";
        elemento("tentar").hidden = false;
    }
}

// Valida o contrato do JSON, incluindo índice de resposta e URL da fonte.
function questaoValida(q) {
    if (!q || typeof q.pergunta !== "string" || !q.pergunta.trim() ||
        !Array.isArray(q.alternativas) || q.alternativas.length !== 4 ||
        !q.alternativas.every(a => typeof a === "string" && a.trim()) ||
        !Number.isInteger(q.resposta) || q.resposta < 0 || q.resposta > 3 ||
        typeof q.explicacao !== "string" || !q.explicacao.trim()) return false;
    try { return new URL(q.fonte).protocol === "https:"; }
    catch { return false; }
}

function iniciarJogo(evento) {
    evento.preventDefault(); // Evita que o formulário recarregue a página.
    if (fase !== "inicio" || perguntas.length === 0) return;
    nomeJogador = elemento("nome").value.trim();
    if (!nomeJogador) {
        elemento("erro-nome").textContent = "Digite um nome ou apelido, sem deixar apenas espaços.";
        elemento("nome").focus();
        return;
    }
    elemento("erro-nome").textContent = "";
    perguntaAtual = 0;
    pontuacao = 0;
    fase = "jogo";
    elemento("inicio").hidden = true;
    elemento("jogo").hidden = false;
    elemento("jogador").textContent = nomeJogador;
    mostrarPergunta();
}

function mostrarPergunta() {
    const questao = perguntas[perguntaAtual];
    respondeu = false;
    elemento("pergunta").textContent = questao.pergunta;
    elemento("progresso-texto").textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    elemento("barra").style.width = `${((perguntaAtual + 1) / perguntas.length) * 100}%`;
    elemento("alternativas").replaceChildren();
    questao.alternativas.forEach(function (texto, indice) {
        const rotulo = document.createElement("label");
        rotulo.className = "option";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "resposta";
        input.value = indice;
        const letra = document.createElement("span");
        letra.className = "letter";
        letra.textContent = String.fromCharCode(65 + indice);
        const descricao = document.createElement("span");
        descricao.textContent = texto;
        rotulo.append(input, letra, descricao);
        elemento("alternativas").append(rotulo);
    });
    elemento("feedback").textContent = "Selecione uma alternativa e confirme.";
    elemento("aviso-botao").textContent = `Pontos: ${pontuacao}`;
    elemento("confirmar").hidden = false;
    elemento("proxima").hidden = true;
    elemento("pergunta").focus();
}

function verificarResposta() {
    if (fase !== "jogo" || respondeu) return;
    const selecionada = document.querySelector('input[name="resposta"]:checked');
    if (!selecionada) {
        elemento("feedback").textContent = "Selecione uma alternativa antes de confirmar.";
        document.querySelector('input[name="resposta"]').focus();
        return;
    }
    respondeu = true; // Impede contar pontos mais de uma vez na mesma questão.
    const questao = perguntas[perguntaAtual];
    const acertou = Number(selecionada.value) === questao.resposta;
    if (acertou) pontuacao++;
    const mensagem = document.createElement("strong");
    mensagem.textContent = acertou ? "✓ Resposta correta! +1 ponto." :
        `✗ Resposta incorreta. A correta é ${String.fromCharCode(65 + questao.resposta)}: ${questao.alternativas[questao.resposta]}.`;
    const explicacao = document.createElement("p");
    explicacao.textContent = questao.explicacao;
    const fonte = document.createElement("a");
    fonte.href = questao.fonte;
    fonte.textContent = "Consultar fonte (abre em nova aba) ↗";
    fonte.target = "_blank";
    fonte.rel = "noopener noreferrer";
    elemento("feedback").replaceChildren(mensagem, explicacao, fonte);
    document.querySelectorAll('input[name="resposta"]').forEach(input => { input.disabled = true; });
    elemento("aviso-botao").textContent = `Pontos: ${pontuacao}`;
    elemento("confirmar").hidden = true;
    elemento("proxima").hidden = false;
    elemento("proxima").textContent = perguntaAtual === perguntas.length - 1 ? "Ver resultado →" : "Próxima pergunta →";
    fonte.focus();
}

function avancarPergunta() {
    if (fase !== "jogo" || !respondeu) return;
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) mostrarPergunta();
    else finalizarJogo();
}

function finalizarJogo() {
    fase = "resultado";
    elemento("jogo").hidden = true;
    elemento("resultado").hidden = false;
    elemento("pontuacao-final").textContent = `${nomeJogador}, você acertou ${pontuacao} de ${perguntas.length}!`;
    const partida = { nome: nomeJogador, pontos: pontuacao, total: perguntas.length };
    ranking.push(partida);
    // Ordenação estável: empates mantêm a ordem de entrada.
    ranking.sort((a, b) => b.pontos / b.total - a.pontos / a.total);
    try { sessionStorage.setItem(CHAVE_RANKING, JSON.stringify(ranking)); }
    catch { armazenamentoDisponivel = false; }
    elemento("ranking").replaceChildren();
    ranking.forEach(item => {
        const linha = document.createElement("li");
        linha.textContent = `${item.nome} — ${item.pontos}/${item.total}${item === partida ? " · esta partida" : ""}`;
        if (item === partida) linha.className = "partida-atual";
        elemento("ranking").append(linha);
    });
    elemento("aviso-ranking").textContent = armazenamentoDisponivel ?
        "Ranking salvo nesta sessão. Fechar a aba encerra a sessão." :
        "O navegador bloqueou o armazenamento. O ranking será mantido apenas enquanto esta página permanecer aberta, sem recarregar.";
    elemento("fim-titulo").focus();
}

function lerRanking() {
    try {
        const salvo = JSON.parse(sessionStorage.getItem(CHAVE_RANKING) || "[]");
        ranking = Array.isArray(salvo) ? salvo.filter(item => item &&
            typeof item.nome === "string" && item.nome.length <= 40 &&
            Number.isInteger(item.pontos) && Number.isInteger(item.total) &&
            item.total > 0 && item.pontos >= 0 && item.pontos <= item.total) : [];
    } catch {
        ranking = []; // JSON corrompido ou armazenamento indisponível não bloqueiam o jogo.
    }
}

function reiniciarJogo() {
    fase = "inicio";
    perguntaAtual = 0;
    pontuacao = 0;
    respondeu = false;
    elemento("resultado").hidden = true;
    elemento("inicio").hidden = false;
    elemento("nome").focus();
    elemento("nome").select();
    // O ranking permanece; não usamos location.reload().
}
