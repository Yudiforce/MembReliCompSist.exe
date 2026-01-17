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
if (window.location.pathname.includes('central.html')) {
    setInterval(() => {
        let tempo = parseInt(localStorage.getItem('talossian_time'));
        let credito = parseInt(localStorage.getItem('credito_social'));
        
        // Passa o tempo e cobra o "oxigênio"
        tempo += 1;
        credito -= CUSTO_OXIGENIO;
        
        localStorage.setItem('talossian_time', tempo);
        localStorage.setItem('credito_social', Math.max(0, credito));
        
        atualizarInterface();
        
        // Verificação de Game Over Silencioso
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