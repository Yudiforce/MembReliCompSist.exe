// CONFIGURAÇÕES DO GOVERNO TALOSSIAN
const VELOCIDADE_TEMPO = 10000; // 1 minuto de jogo = 10 segundos reais
const CUSTO_OXIGENIO = 1;      // Quanto de Crédito Social perde por "minuto" parado

// Função para formatar o tempo (Ex: 08:00)
function formatarTempo(minutosTotais) {
    let horas = Math.floor(minutosTotais / 60) % 24;
    let minutos = minutosTotais % 60;
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
}

// Inicializa ou recupera os dados do localStorage
function inicializarSistema() {
    if (!localStorage.getItem('talossian_time')) {
        localStorage.setItem('talossian_time', 480); // Começa às 08:00
        localStorage.setItem('credito_social', 100);
        localStorage.setItem('producao', 80);
        localStorage.setItem('lepra', 5);
        localStorage.setItem('indignacao', 10);
    }
    atualizarInterface();
}

// Atualiza o relógio e as barras na tela atual
function atualizarInterface() {
    const tempo = parseInt(localStorage.getItem('talossian_time'));
    const relogioElemento = document.getElementById('relogio-universal');
    
    if (relogioElemento) {
        relogioElemento.innerText = formatarTempo(tempo);
    }
    
    // Se houver barras de status nesta aba (Setor A ou Central), atualiza elas
    const barraCredito = document.getElementById('barra-credito');
    if (barraCredito) {
        barraCredito.value = localStorage.getItem('credito_social');
    }
}

// O MOTOR DO TEMPO (Roda apenas na Central para não duplicar a velocidade)
// Ajuste para 1 segundo real = 1 minuto de jogo
const VELOCIDADE_TEMPO = 1000; // 1000ms = 1 segundo real

if (window.location.pathname.includes('Central.html')) {
    setInterval(() => {
        let tempo = parseInt(localStorage.getItem('talossian_time'));
        let credito = parseInt(localStorage.getItem('credito_social'));
        
        // Cada vez que o código roda (1s), passa 1 minuto no jogo
        tempo += 1; 
        
        // O custo de oxigênio/crédito pode ser cobrado a cada "hora" de jogo
        if (tempo % 60 === 0) {
            credito -= 5; // Perde 5 de crédito a cada 1 hora de jogo (1 min real)
            console.log("Custo de socialização cobrado pela Talossian.");
        }

        localStorage.setItem('talossian_time', tempo);
        localStorage.setItem('credito_social', Math.max(0, credito));
        
        atualizarInterface();
        
        // Game Over Silencioso
        if (credito <= 0) {
            window.location.href = "game_over.html"; 
        }
    }, VELOCIDADE_TEMPO);
}

// ESCUTADOR: Se o tempo mudar em outra aba, esta aba atualiza também
window.addEventListener('storage', (e) => {
    atualizarInterface();
});

// Inicia ao carregar a página

window.onload = inicializarSistema;
