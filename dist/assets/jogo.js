"use strict";

const CHAVE_RANKING = "cronotech.cp3.ranking";
const $ = id => document.getElementById(id);

let perguntas = [];
let perguntaAtual = 0;
let pontuacao = 0;
let nomeJogador = "";
let respondeu = false;
let ranking = [];
let armazenamentoDisponivel = true;

$("form-inicio").addEventListener("submit", iniciarJogo);
$("confirmar").addEventListener("click", verificarResposta);
$("proxima").addEventListener("click", avancarPergunta);
$("reiniciar").addEventListener("click", reiniciarJogo);
$("tentar").addEventListener("click", carregarPerguntas);

lerRanking();
mostrarRanking();
carregarPerguntas();

async function carregarPerguntas() {
    $("jogar").disabled = true;
    $("tentar").hidden = true;
    $("carregamento").textContent = "Carregando perguntas…";

    try {
        const response = await fetch("./perguntas.json");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const dados = await response.json();
        if (!Array.isArray(dados) || dados.length === 0 || !dados.every(questaoValida)) {
            throw new Error("O arquivo perguntas.json tem um formato inválido.");
        }

        perguntas = dados;
        $("carregamento").textContent = `${perguntas.length} perguntas prontas. Boa jornada!`;
        $("jogar").disabled = false;
    } catch (error) {
        console.error("Não foi possível carregar as perguntas:", error);
        $("carregamento").textContent = "Não foi possível carregar as perguntas. Abra index.html com Live Server e tente novamente.";
        $("tentar").hidden = false;
    }
}

function questaoValida(questao) {
    return questao &&
        typeof questao.pergunta === "string" &&
        Array.isArray(questao.alternativas) &&
        questao.alternativas.length === 4 &&
        questao.alternativas.every(alternativa => typeof alternativa === "string") &&
        Number.isInteger(questao.resposta) &&
        questao.resposta >= 0 && questao.resposta < 4 &&
        typeof questao.explicacao === "string" &&
        typeof questao.fonteTitulo === "string" &&
        typeof questao.fonte === "string" &&
        questao.fonte.startsWith("https://");
}

function iniciarJogo(evento) {
    evento.preventDefault();
    if ($("inicio").hidden || !$("jogo").hidden) return;
    nomeJogador = $("nome").value.trim();
    if (!nomeJogador || !perguntas.length) {
        $("erro-nome").textContent = nomeJogador ? "" : "Digite seu nome para começar.";
        return;
    }

    nomeJogador = nomeJogador.slice(0, 40);
    perguntaAtual = 0;
    pontuacao = 0;
    $("erro-nome").textContent = "";
    $("inicio").hidden = true;
    $("resultado").hidden = true;
    $("jogo").hidden = false;
    $("jogador").textContent = nomeJogador;
    mostrarPergunta();
}

function mostrarPergunta() {
    const questao = perguntas[perguntaAtual];
    respondeu = false;
    $("pergunta").textContent = questao.pergunta;
    $("progresso-texto").textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    $("barra").style.width = `${((perguntaAtual + 1) / perguntas.length) * 100}%`;
    $("alternativas").replaceChildren();

    questao.alternativas.forEach((alternativa, indice) => {
        const rotulo = document.createElement("label");
        rotulo.className = "option";
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "resposta";
        radio.value = indice;
        const letra = document.createElement("span");
        letra.className = "letter";
        letra.textContent = String.fromCharCode(65 + indice);
        const texto = document.createElement("span");
        texto.textContent = alternativa;
        rotulo.append(radio, letra, texto);
        $("alternativas").append(rotulo);
    });

    $("feedback").className = "feedback";
    $("feedback").textContent = "Selecione uma alternativa e confirme.";
    $("aviso-botao").textContent = `Pontos: ${pontuacao}`;
    $("confirmar").hidden = false;
    $("proxima").hidden = true;
    $("pergunta").focus();
}

function verificarResposta() {
    if ($("jogo").hidden || respondeu) return;
    const selecionada = document.querySelector('input[name="resposta"]:checked');
    if (!selecionada) {
        $("feedback").textContent = "Selecione uma alternativa antes de confirmar.";
        return;
    }

    respondeu = true;
    const questao = perguntas[perguntaAtual];
    const correta = Number(selecionada.value) === questao.resposta;
    if (correta) pontuacao++;

    document.querySelectorAll('input[name="resposta"]').forEach(radio => {
        const alternativa = radio.closest(".option");
        if (Number(radio.value) === questao.resposta) alternativa.classList.add("option--correct");
        else if (radio === selecionada) alternativa.classList.add("option--incorrect");
        radio.disabled = true;
    });

    $("feedback").className = `feedback ${correta ? "feedback--correct" : "feedback--incorrect"}`;
    const mensagem = document.createElement("strong");
    mensagem.textContent = correta
        ? "✓ Resposta correta! +1 ponto."
        : `✗ Resposta incorreta. A correta é ${String.fromCharCode(65 + questao.resposta)}: ${questao.alternativas[questao.resposta]}`;
    const explicacao = document.createElement("p");
    explicacao.textContent = questao.explicacao;
    const fonte = document.createElement("a");
    fonte.href = questao.fonte;
    fonte.target = "_blank";
    fonte.rel = "noopener noreferrer";
    fonte.textContent = `Ler: ${questao.fonteTitulo} ↗`;
    $("feedback").replaceChildren(mensagem, explicacao, fonte);

    $("aviso-botao").textContent = `Pontos: ${pontuacao}`;
    $("confirmar").hidden = true;
    $("proxima").hidden = false;
    $("proxima").textContent = perguntaAtual === perguntas.length - 1 ? "Ver resultado →" : "Próxima pergunta →";
}

function avancarPergunta() {
    if (!respondeu || $("jogo").hidden || $("proxima").hidden) return;
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        finalizarJogo();
    }
}

function finalizarJogo() {
    $("jogo").hidden = true;
    $("resultado").hidden = false;
    $("pontuacao-final").textContent = `${nomeJogador}, você acertou ${pontuacao} de ${perguntas.length}!`;

    const partida = { nome: nomeJogador, pontos: pontuacao, total: perguntas.length };
    ranking.push(partida);
    ranking.sort((a, b) => b.pontos / b.total - a.pontos / a.total);
    try {
        sessionStorage.setItem(CHAVE_RANKING, JSON.stringify(ranking));
    } catch {
        armazenamentoDisponivel = false;
    }

    mostrarRanking(partida);
}

function mostrarRanking(ultimaPartida) {
    $("ranking-board").hidden = ranking.length === 0;
    $("ranking").replaceChildren();
    ranking.forEach(partida => {
        const item = document.createElement("li");
        const percentual = Math.round(partida.pontos / partida.total * 100);
        item.textContent = `${partida.nome} — ${partida.pontos}/${partida.total} (${percentual}%)`;
        if (partida === ultimaPartida) item.classList.add("partida-atual");
        $("ranking").append(item);
    });
    $("aviso-ranking").textContent = armazenamentoDisponivel
        ? "Placar salvo nesta aba durante a sessão."
        : "Não foi possível salvar. O placar ficará disponível enquanto esta página estiver aberta.";
}

function lerRanking() {
    try {
        const salvo = JSON.parse(sessionStorage.getItem(CHAVE_RANKING) || "[]");
        if (Array.isArray(salvo)) ranking = salvo.filter(partida =>
            partida && typeof partida.nome === "string" &&
            Number.isInteger(partida.pontos) && Number.isInteger(partida.total) &&
            partida.total > 0 && partida.pontos >= 0 && partida.pontos <= partida.total
        );
        ranking.sort((a, b) => b.pontos / b.total - a.pontos / a.total);
    } catch {
        armazenamentoDisponivel = false;
    }
}

function reiniciarJogo() {
    $("resultado").hidden = true;
    $("inicio").hidden = false;
    $("nome").focus();
}
