// ========== CONFIGURAÇÕES ==========
const TEMPO_TOTAL = 10 * 60; // 10 minutos
const PAGINA_GAMEOVER = "gameOver.html";
const PAGINA_VITORIA = "explicacao.html";
const PAGINA_INICIAL = "escritorio.html"; // nome exato do seu arquivo inicial

// ========== INÍCIO DO TEMPORIZADOR ==========

// Detecta qual página está aberta
const paginaAtual = window.location.pathname.split("/").pop();

// Se for a página inicial, sempre reinicia o timer (nova execução do jogo)
if (paginaAtual === PAGINA_INICIAL) {
  localStorage.removeItem("tempo_inicio");
}

let inicio = localStorage.getItem("tempo_inicio");

// Se não houver horário salvo (primeira execução), inicia agora
if (!inicio) {
  inicio = Date.now();
  localStorage.setItem("tempo_inicio", inicio);
}

// ========== FUNÇÃO PARA ATUALIZAR O RELÓGIO ==========
function atualizarTimer() {
  const agora = Date.now();
  const tempoPassado = Math.floor((agora - inicio) / 1000);
  const tempoRestante = Math.max(TEMPO_TOTAL - tempoPassado, 0);

  const minutos = Math.floor(tempoRestante / 60);
  const segundos = tempoRestante % 60;

  const timer = document.getElementById("timer");
  if (timer) {
    timer.textContent = `${minutos.toString().padStart(2, "0")}:${segundos
      .toString()
      .padStart(2, "0")}`;
  }

  // Quando o tempo acabar
  if (tempoRestante <= 0) {
    clearInterval(intervalo);
    localStorage.removeItem("tempo_inicio");
    window.location.href = PAGINA_GAMEOVER;
  }
}

// ========== INTERVALO DE ATUALIZAÇÃO ==========
const intervalo = setInterval(atualizarTimer, 1000);
atualizarTimer();

// ========== FUNÇÃO PARA VENCER O JOGO ==========
function vencerJogo() {
  clearInterval(intervalo);
  localStorage.removeItem("tempo_inicio");
  window.location.href = PAGINA_VITORIA;
}

window.vencerJogo = vencerJogo;
