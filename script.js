// INICIALIZAÇÃO DO CANVAS
const canvas = document.getElementById('canvas-bandeira');
if (canvas) {
    const ctx = canvas.getContext('2d');

    // ELEMENTOS DE CONTROLE
    const corFundo = document.getElementById('cor-fundo');
    const corSimbolo = document.getElementById('cor-simbolo');
    const tipoSimbolo = document.getElementById('tipo-simbolo');
    const qtdSimbolo = document.getElementById('qtd-simbolo');
    const tamanhoSimbolo = document.getElementById('tamanho-simbolo');
    const btnDesenhar = document.getElementById('btn-desenhar');
    const btnSalvar = document.getElementById('btn-salvar');

    // DEFINIR TAMANHO PADRÃO
    canvas.width = 300;
    canvas.height = 200;

    // FUNÇÃO PARA DESENHAR SÍMBOLOS PROFISSIONAIS
    function desenharSimbolo(tipo, tamanho, cor) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = cor;

        switch(tipo) {
            case 'estrela':
                desenharEstrela(tamanho, cor);
                break;
            case 'cruz':
                desenharCruz(tamanho, cor);
                break;
            case 'sol':
                desenharSol(tamanho, cor);
                break;
            case 'lua':
                desenharLua(tamanho, cor);
                break;
            case 'aguia':
                desenharAguia(tamanho, cor);
                break;
            case 'dragao':
                desenharDragao(tamanho, cor);
                break;
            case 'flor':
                desenharFlor(tamanho, cor);
                break;
            case 'escudo':
                desenharEscudo(tamanho, cor);
                break;
            default:
                desenharEstrela(tamanho, cor);
        }
    }

    // DESENHAR ESTRELA PADRÃO
    function desenharEstrela(tamanho, cor) {
        ctx.fillStyle = cor;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            ctx.lineTo(tamanho, 0);
            ctx.rotate(Math.PI / 5);
            ctx.lineTo(tamanho / 2, 0);
            ctx.rotate(Math.PI / 5);
        }
        ctx.fill();
    }

    // DESENHAR CRUZ
    function desenharCruz(tamanho, cor) {
        ctx.fillStyle = cor;
        ctx.fillRect(canvas.width/2 - tamanho/2, canvas.height/2 - tamanho/6, tamanho, tamanho/3);
        ctx.fillRect(canvas.width/2 - tamanho/6, canvas.height/2 - tamanho/2, tamanho/3, tamanho);
    }

    // DESENHAR SOL
    function desenharSol(tamanho, cor) {
        ctx.fillStyle = cor;
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, tamanho/2, 0, Math.PI * 2);
        ctx.fill();

        // Raios do sol
        for (let i = 0; i < 12; i++) {
            ctx.save();
            ctx.translate(canvas.width/2, canvas.height/2);
            ctx.rotate(i * Math.PI / 6);
            ctx.fillRect(0, -tamanho/2, tamanho/4, tamanho/2);
            ctx.restore();
        }
    }

    // DESENHAR LUA
    function desenharLua(tamanho, cor) {
        ctx.fillStyle = cor;
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, tamanho/2, 0.2 * Math.PI, 1.8 * Math.PI);
        ctx.lineTo(canvas.width/2, canvas.height/2 - tamanho/4);
        ctx.fill();
    }

    // DESENHAR ÁGUIA
    function desenharAguia(tamanho, cor) {
        ctx.fillStyle = cor;
        ctx.beginPath();
        ctx.moveTo(canvas.width/2 - tamanho, canvas.height/2);
        ctx.lineTo(canvas.width/2, canvas.height/2 - tamanho);
        ctx.lineTo(canvas.width/2 + tamanho, canvas.height/2);
        ctx.lineTo(canvas.width/2, canvas.height/2 + tamanho/2);
        ctx.fill();

        // Cabeça da águia
        ctx.beginPath();
        ctx.arc(canvas.width/2 + tamanho/2, canvas.height/2 - tamanho/2, tamanho/4, 0, Math.PI * 2);
        ctx.fill();
    }

    // DESENHAR DRAGÃO
    function desenharDragao(tamanho, cor) {
        ctx.fillStyle = cor;
        ctx.beginPath();
        ctx.moveTo(canvas.width/2 - tamanho, canvas.height/2);
        ctx.bezierCurveTo(canvas.width/2 - tamanho/2, canvas.height/2 - tamanho/2, 
                          canvas.width/2 + tamanho/2, canvas.height/2 - tamanho/2, 
                          canvas.width/2 + tamanho, canvas.height/2);
        ctx.bezierCurveTo(canvas.width/2 + tamanho/2, canvas.height/2 + tamanho/2, 
                          canvas.width/2 - tamanho/2, canvas.height/2 + tamanho/2, 
                          canvas.width/2 - tamanho, canvas.height/2);
        ctx.fill();

        // Olho do dragão
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(canvas.width/2 - tamanho/4, canvas.height/2 - tamanho/4, tamanho/8, 0, Math.PI * 2);
        ctx.fill();
    }

    // DESENHAR FLOR
    function desenharFlor(tamanho, cor) {
        ctx.fillStyle = cor;
        for (let i = 0; i < 8; i++) {
            ctx.save();
            ctx.translate(canvas.width/2, canvas.height/2);
            ctx.rotate(i * Math.PI / 4);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(tamanho/4, -tamanho/4, tamanho/2, 0, tamanho/4, tamanho/4);
            ctx.fill();
            ctx.restore();
        }
    }

    // DESENHAR ESCUDO
    function desenharEscudo(tamanho, cor) {
        ctx.fillStyle = cor;
        ctx.beginPath();
        ctx.moveTo(canvas.width/2, canvas.height/2 - tamanho/2);
        ctx.lineTo(canvas.width/2 + tamanho/2, canvas.height/2);
        ctx.lineTo(canvas.width/2, canvas.height/2 + tamanho/2);
        ctx.lineTo(canvas.width/2 - taman
