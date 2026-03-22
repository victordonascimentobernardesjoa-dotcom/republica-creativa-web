// FERRAMENTA DE CRIAÇÃO DE BANDEIRAS
const canvasBandeira = document.getElementById('canvas-bandeira');
const corFundo = document.getElementById('cor-fundo');
const corSimbolo = document.getElementById('cor-simbolo');
const selecionarSimbolo = document.getElementById('simbolo');
const btnSalvar = document.getElementById('salvar-bandeira');

// Cria o canvas para desenho
const canvas = document.createElement('canvas');
canvas.width = 300;
canvas.height = 200;
canvasBandeira.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Pinta o fundo inicial
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Atualiza cor de fundo
corFundo.addEventListener('input', () => {
    ctx.fillStyle = corFundo.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    desenharSimbolo();
});

// Atualiza cor do símbolo
corSimbolo.addEventListener('input', desenharSimbolo);

// Atualiza tipo de símbolo
selecionarSimbolo.addEventListener('change', desenharSimbolo);

// Função para desenhar o símbolo
function desenharSimbolo() {
    // Limpa o canvas mantendo a cor de fundo
    ctx.fillStyle = corFundo.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = corSimbolo.value;
    const simbolo = selecionarSimbolo.value;

    switch(simbolo) {
        case 'estrela':
            desenharEstrela();
            break;
        case 'cruz':
            desenharCruz();
            break;
        case 'sol':
            desenharSol();
            break;
        case 'dragao':
            desenharDragaoSimples();
            break;
    }
}

// Funções de desenho de símbolos
function desenharEstrela() {
    ctx.beginPath();
    ctx.moveTo(150, 50);
    ctx.lineTo(161, 85);
    ctx.lineTo(200, 85);
    ctx.lineTo(170, 110);
    ctx.lineTo(181, 145);
    ctx.lineTo(150, 120);
    ctx.lineTo(119, 145);
    ctx.lineTo(130, 110);
    ctx.lineTo(100, 85);
    ctx.lineTo(139, 85);
    ctx.closePath();
    ctx.fill();
}

function desenharCruz() {
    ctx.fillRect(120, 80, 60, 15);
    ctx.fillRect(140, 60, 15, 55);
}

function desenharSol() {
    ctx.beginPath();
    ctx.arc(150, 100, 50, 0, Math.PI * 2);
    ctx.fill();

    // Raios do sol
    for(let i = 0; i < 8; i++) {
        ctx.save();
        ctx.translate(150, 100);
        ctx.rotate(i * Math.PI / 4);
        ctx.fillRect(0, -70, 10, 20);
        ctx.restore();
    }
}

function desenharDragaoSimples() {
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.bezierCurveTo(120, 80, 140, 70, 160, 80);
    ctx.bezierCurveTo(180, 90, 190, 110, 180, 130);
    ctx.bezierCurveTo(160, 150, 120, 140, 100, 120);
    ctx.closePath();
    ctx.fill();

    // Olho
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(150, 90, 3, 0, Math.PI * 2);
    ctx.fill();
}

// Salva a bandeira como imagem
btnSalvar.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'minha-bandeira.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});
