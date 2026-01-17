// CONFIGURAÇÕES DO GOVERNO TALOSSIAN
const VELOCIDADE_TEMPO = 1000; // 1 segundo real = 1 minuto de jogo

function formatarTempo(minutosTotais) {
    let horas = Math.floor(minutosTotais / 60) % 24;
    let minutos = minutosTotais % 60;
    
    // Segundos fictícios que acompanham o relógio do sistema real para dar movimento
    let segundosFicticios = new Date().getSeconds().toString().padStart(2, '0');
    
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundosFicticios}`;
}

function inicializarSistema() {
    if (!localStorage.getItem('talossian_time')) {
        localStorage.setItem('talossian_time', 480); // Inicia às 08:00
        localStorage.setItem('credito_social', 100);
    }
    atualizarInterface();
}

function atualizarInterface() {
    const tempo = parseInt(localStorage.getItem('talossian_time'));
    const relogioElemento = document.getElementById('relogio-universal');
    
    if (relogioElemento) {
        relogioElemento.innerText = formatarTempo(tempo);
    }
}

// O MOTOR (Apenas no Central.html)
if (window.location.pathname.includes('Central.html')) {
    setInterval(() => {
        let tempo = parseInt(localStorage.getItem('talossian_time')) || 480;
        let credito = parseInt(localStorage.getItem('credito_social')) || 100;
        
        tempo += 1; // Avança 1 minuto de jogo por segundo real
        
        // Cobra crédito a cada hora (60 segundos reais)
        if (tempo % 60 === 0) {
            credito -= 5;
            localStorage.setItem('credito_social', Math.max(0, credito));
        }

        localStorage.setItem('talossian_time', tempo);
        atualizarInterface();
        
        if (credito <= 0) window.location.href = "game_over.html"; 
    }, VELOCIDADE_TEMPO);
}

window.addEventListener('storage', () => atualizarInterface());
window.onload = inicializarSistema;
