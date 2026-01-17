// CONFIGURAÇÕES DO GOVERNO TALOSSIAN
const VELOCIDADE_TEMPO = 1000; // 1 segundo real = 1 minuto de jogo
const CUSTO_OXIGENIO = 1;      

// Função para formatar o tempo com SEGUNDOS fictícios (Ex: 08:00:00)
function formatarTempo(minutosTotais) {
    let horas = Math.floor(minutosTotais / 60) % 24;
    let minutos = minutosTotais % 60;
    // Adicionamos :00 no final para o estilo digital da sua imagem
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:00`;
}

function inicializarSistema() {
    if (!localStorage.getItem('talossian_time')) {
        localStorage.setItem('talossian_time', 480); // 08:00
        localStorage.setItem('credito_social', 100);
        localStorage.setItem('producao', 80);
        localStorage.setItem('lepra', 5);
        localStorage.setItem('indignacao', 10);
    }
    atualizarInterface();
}

function atualizarInterface() {
    const tempo = parseInt(localStorage.getItem('talossian_time'));
    const relogioElemento = document.getElementById('relogio-universal');
    
    if (relogioElemento) {
        relogioElemento.innerText = formatarTempo(tempo);
    }
    
    const barraCredito = document.getElementById('barra-credito');
    if (barraCredito) {
        barraCredito.value = localStorage.getItem('credito_social');
    }
}

// O MOTOR DO TEMPO
// Use "Central.html" com C maiúsculo para bater com o nome do seu arquivo
if (window.location.pathname.includes('Central.html')) {
    setInterval(() => {
        let tempo = parseInt(localStorage.getItem('talossian_time'));
        let credito = parseInt(localStorage.getItem('credito_social'));
        
        tempo += 1; // Passa 1 minuto de jogo
        
        // Cobra 5 de crédito a cada 1 hora de jogo (60 segundos reais)
        if (tempo % 60 === 0) {
            credito -= 5;
            localStorage.setItem('credito_social', Math.max(0, credito));
        }

        localStorage.setItem('talossian_time', tempo);
        atualizarInterface();
        
        if (credito <= 0) {
            window.location.href = "game_over.html"; 
        }
    }, VELOCIDADE_TEMPO);
}

window.addEventListener('storage', (e) => {
    atualizarInterface();
});

window.onload = inicializarSistema;
