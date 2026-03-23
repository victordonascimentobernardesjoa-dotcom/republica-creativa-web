// INICIALIZAÇÃO DO CANVAS
const canvas = document.getElementById('canvas-bandeira');
const ctx = canvas.getContext('2d');

// ELEMENTOS DE CONTROLE
const corFundo = document.getElementById('cor-fundo');
const corSimbolo = document.getElementById('cor-simbolo');
const tipoSimbolo = document.getElementById('tipo-simbolo');
const qtdSimbolo = document.getElementById('qtd-simbolo');
const posicaoSimbolo = document.getElementById('posicao-simbolo');
const btnDesenhar = document.getElementById('btn-desenhar');
const btnSalvar = document.getElementById('btn-salvar');
const uploadBandeira = document.getElementById('upload-bandeira');
const previewBandeira = document.getElementById('preview-bandeira');
const btnConfirmar = document.getElementById('btn-confirmar');
const ideologiaSelecao = document.getElementById('ideologia-selecao');
const formIdeologiaPropria = document.getElementById('form-ideologia-propria');

// DESENHA A BANDEIRA INICIAL (BRANCA)
desenharBandeira();

// EVENTO PARA DESENHAR QUANDO CLICAR NO BOTÃO
btnDesenhar.addEventListener('click', desenharBandeira);

// EVENTO PARA SALVAR A BANDEIRA
btnSalvar.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = `minha-bandeira-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    alert('Bandeira salva com sucesso!');
});

// EVENTO PARA PREVISUALIZAR UPLOAD
uploadBandeira.addEventListener('change', (e) => {
    const arquivo = e.target.files[0];
    if (arquivo) {
        const leitor = new FileReader();
        leitor.onload = (event) => {
            previewBandeira.innerHTML = `<img src="${event.target.result}" width="250" height="150">`;
        }
        leitor.readAsDataURL(arquivo);
    } else {
        previewBandeira.innerHTML = 'Nenhuma imagem selecionada';
    }
});

// EVENTO PARA CONFIRMAR UPLOAD
btnConfirmar.addEventListener('click', () => {
    if (uploadBandeira.files.length > 0) {
        alert('Bandeira importada com sucesso!');
    } else {
        alert('Selecione uma imagem primeiro!');
    }
});

// EVENTO PARA MOSTRAR CAMPO DE IDEOLOGIA PRÓPRIA
ideologiaSelecao.addEventListener('change', () => {
    if (ideologiaSelecao.value === 'propria') {
        formIdeologiaPropria.style.display = 'block';
    } else {
        formIdeologiaPropria.style.display = 'none';
    }
});

// FUNÇÃO PRINCIPAL PARA DESENHAR A BANDEIRA
function desenharBandeira() {
    // LIMPA O CANVAS
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // PINTA O FUNDO
    ctx.fillStyle = corFundo.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // DEFINE COR DO SÍMBOLO
    ctx.fillStyle = corSimbolo.value;
    ctx.strokeStyle = corSimbolo.value;

    // PEGA VALORES DOS CONTROLES
    const tipo = tipoSimbolo.value;
    const qtd = parseInt(qtdSimbolo.value);
    const posicao = posicaoSimbolo.value;

    // POSICIONA OS SÍMBOLOS CONFORME ESCOLHA
    switch(posicao) {
        case 'centro':
            desenharSimbolo(tipo, canvas.width/2, canvas.height/2, 30);
            break;
        case 'linha-horizontal':
            const espacoH = canvas.width / (qtd + 1);
            for(let i = 0; i < qtd; i++) {
                desenharSimbolo(tipo, espacoH * (i+1), canvas.height/2, 20);
            }
            break;
        case 'linha-vertical':
            const espacoV = canvas.height / (qtd + 1);
            for(let i = 0; i < qtd; i++) {
                desenharSimbolo(tipo, canvas.width/2, espacoV * (i+1), 20);
            }
            break;
        case 'grade':
            const colunas = Math.ceil(Math.sqrt(qtd));
            const linhas = Math.ceil(qtd / colunas);
            const espacoX = canvas.width / (colunas + 1);
            const espacoY = canvas.height / (linhas + 1);
            let contador = 0;
            for(let l = 0; l < linhas; l++) {
                for(let c = 0; c < colunas; c++) {
                    if(contador < qtd) {
                        desenharSimbolo(tipo, espacoX * (c+1), espacoY * (l+1), 18);
                        contador++;
                    }
                }
            }
            break;
        case 'cantos':
            const tamanhoCanto = 25;
            desenharSimbolo(tipo, tamanhoCanto*2, tamanhoCanto*2, tamanhoCanto); // Canto superior esquerdo
            desenharSimbolo(tipo, canvas.width - tamanhoCanto*2, tamanhoCanto*2, tamanhoCanto); // Canto superior direito
            desenharSimbolo(tipo, tamanhoCanto*2, canvas.height - tamanhoCanto*2, tamanhoCanto); // Canto inferior esquerdo
            desenharSimbolo(tipo, canvas.width - tamanhoCanto*2, canvas.height - tamanhoCanto*2, tamanhoCanto); // Canto inferior direito
            break;
    }
}

// FUNÇÃO PARA DESENHAR CADA TIPO DE SÍMBOLO
function desenharSimbolo(tipo, x, y, tamanho) {
    ctx.save();
    ctx.translate(x, y);

    switch(tipo) {
        case 'estrela':
            desenharEstrela(0, 0, tamanho, 8);
            break;
        case 'estrela-5':
            desenharEstrela(0, 0, tamanho, 5);
            break;
        case 'cruz':
            ctx.fillRect(-tamanho/2, -tamanho/6, tamanho, tamanho/3);
            ctx.fillRect(-tamanho/6, -tamanho/2, tamanho/3, tamanho);
            break;
        case 'cruz-malta':
            ctx.beginPath();
            ctx.moveTo(0, -tamanho);
            ctx.lineTo(-tamanho/3, -tamanho/3);
            ctx.lineTo(-tamanho, 0);
            ctx.lineTo(-tamanho/3, tamanho/3);
            ctx.lineTo(0, tamanho);
            ctx.lineTo(tamanho/3, tamanho/3);
            ctx.lineTo(tamanho, 0);
            ctx.lineTo(tamanho/3, -tamanho/3);
            ctx.closePath();
            ctx.fill();
            break;
        case 'sol':
            ctx.beginPath();
            ctx.arc(0, 0, tamanho/2, 0, Math.PI*2);
            ctx.fill();
            // Raios do sol
            for(let i = 0; i < 12; i++) {
                ctx.rotate(Math.PI/6);
                ctx.fillRect(0, -tamanho, tamanho/4, tamanho/2);
            }
            break;
        case 'lua':
            ctx.beginPath();
            ctx.arc(0, 0, tamanho/2, 0.2*Math.PI, 1.8*Math.PI);
            ctx.lineTo(0, -tamanho/4);
            ctx.closePath();
            ctx.fill();
            break;
        case 'dragao':
            // Dragão simples
            ctx.beginPath();
            ctx.moveTo(-tamanho/2, 0);
            ctx.bezierCurveTo(-tamanho/3, -tamanho/3, tamanho/3, -tamanho/3, tamanho/2, 0);
            ctx.bezierCurveTo(tamanho/3, tamanho/3, -tamanho/3, tamanho/3, -tamanho/2, 0);
            ctx.closePath();
            ctx.fill();
            // Olho
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(-tamanho/6, -tamanho/6, tamanho/12, 0, Math.PI*2);
            ctx.fill();
            break;
        case 'ave':
            // Águia
            ctx.beginPath();
            ctx.moveTo(-tamanho/2, 0);
            ctx.lineTo(0, -tamanho/2);
            ctx.lineTo(tamanho/2, 0);
            ctx.lineTo(0, tamanho/2);
            ctx.closePath();
            ctx.fill();
            // Cabeça
            ctx.beginPath();
            ctx.arc(tamanho/2, -tamanho/4, tamanho/8, 0, Math.PI*2);
            ctx.fill();
            break;
        case 'espada':
            // Lâmina
            ctx.beginPath();
            ctx.moveTo(0, -tamanho/2);
            ctx.lineTo(tamanho/4, -tamanho/4);
            ctx.lineTo(tamanho/4, tamanho/4);
            ctx.lineTo(0, tamanho/2);
            ctx.closePath();
            ctx.fill();
            // Cabo
            ctx.fillRect(-tamanho/6, -tamanho/6, tamanho/3, tamanho/3);
            break;
        case 'livro':
            // Capa
            ctx.fillRect(-tamanho/2, -tamanho/3, tamanho, tamanho/2);
            // Páginas
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(-tamanho/2 + 5, -tamanho/3 + 5, tamanho - 10, tamanho/2 - 10);
            // Marcador
            ctx.fillStyle = corSimbolo.value;
            ctx.fillRect(-tamanho/2 + 10, -tamanho/3 - 5, tamanho/3, 5);
            break;
        case 'planta':
            // Flor de Lotus
            for(let i = 0; i < 8; i++) {
                ctx.rotate(Math.PI/4);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(tamanho/4, -tamanho/4, tamanho/2, 0, tamanho/4, tamanho/4);
                ctx.closePath();
                ctx.fill();
            }
            break;
        case 'roda':
            // Roda
            ctx.beginPath();
            ctx.arc(0, 0, tamanho/2, 0, Math.PI*2);
            ctx.stroke();
            // Raios
            for(let i = 0; i < 8; i++) {
                ctx.rotate(Math.PI/4);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(tamanho/2, 0);
                ctx.stroke();
            }
            break;
        case 'escudo':
            // Escudo
            ctx.beginPath();
            ctx.moveTo(0, -tamanho/2);
            ctx.lineTo(tamanho/2, 0);
            ctx.lineTo(tamanho/3, tamanho/2);
            ctx.lineTo(-tamanho/3, tamanho/2);
            ctx.lineTo(-tamanho/2, 0);
            ctx.closePath();
            ctx.fill();
            break;
        case 'flor':
            // Flor de Rosas
            for(let i = 0; i < 5; i++) {
                ctx.rotate(Math.PI*2/5);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(tamanho/4, -tamanho/4, tamanho/2, -tamanho/2, tamanho/4, 0);
                ctx.bezierCurveTo(tamanho/2, tamanho/2, tamanho/4, tamanho/4, 0, 0);
                ctx.closePath();
                ctx.fill();
            }
            break;
        case 'raio':
            // Raio
            ctx.beginPath();
            ctx.moveTo(-tamanho/2, -tamanho/2);
            ctx.lineTo(tamanho/2, 0);
            ctx.lineTo(-tamanho/2, tamanho/2);
            ctx.lineTo(-tamanho/4, 0);
            ctx.closePath();
            ctx.fill();
            break;
        case 'triangulo':
            ctx.beginPath();
            ctx.moveTo(0, -tamanho/2);
            ctx.lineTo(tamanho/2, tamanho/2);
            ctx.lineTo(-tamanho/2, tamanho/2);
            ctx.closePath();
            ctx.fill();
            break;
        case 'circulo':
            ctx.beginPath();
            ctx.arc(0, 0, tamanho/2, 0, Math.PI*2);
            ctx.fill();
            break;
        case 'quadrado':
            ctx.fillRect(-tamanho/2, -tamanho/2, tamanho, tamanho);
            break;
        case 'coração':
            ctx.beginPath();
            ctx.moveTo(0, -tamanho/4);
            ctx.bezierCurveTo(-tamanho/2, -tamanho/2, -tamanho/2, tamanho/4, 0, tamanho/2);
            ctx.bezierCurveTo(tamanho/2, tamanho/4, tamanho/2, -tamanho/2, 0, -tamanho/4);
            ctx.closePath();
            ctx.fill();
            break;
        case 'chave':
            // Cabo da chave
            ctx.fillRect(-tamanho/6, -tamanho/2, tamanho/3, tamanho/2);
            // Corpo
            ctx.fillRect(-tamanho/2, 0, tamanho, tamanho/6);
            // Garras
            ctx.fillRect(-tamanho/2, 0, tamanho/6, tamanho/3);
            ctx.fillRect(tamanho/2 - tamanho/6, 0, tamanho/6, tamanho/3);
            break;
    }

    ctx.restore();
}

// FUNÇÃO PARA DESENHAR ESTRELAS
function desenharEstrela(x, y, raio, pontas) {
    ctx.beginPath();
    for(let i = 0; i < pontas*2; i++) {
        const angulo = (i * Math.PI / pontas) - Math.PI/2;
        const distancia = (i % 2 === 0) ? raio : raio/2;
        const px = x + Math.cos(angulo) * distancia;
        const py = y + Math.sin(angulo) * distancia;
        if(i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
}
