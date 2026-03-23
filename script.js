// INICIALIZAÇÃO GLOBAL
document.addEventListener('DOMContentLoaded', function() {
    // CONFIGURAÇÃO DO CANVAS
    const canvas = document.getElementById('canvas-bandeira');
    const ctx = canvas.getContext('2d');

    // DEFINIR DIMENSÕES FIXAS E VISÍVEIS
    canvas.width = 300;
    canvas.height = 200;
    canvas.style.width = '300px';
    canvas.style.height = '200px';

    // ELEMENTOS DE CONTROLE
    const corFundo = document.getElementById('cor-fundo');
    const corSimbolo = document.getElementById('cor-simbolo');
    const tipoSimbolo = document.getElementById('tipo-simbolo');
    const qtdSimbolo = document.getElementById('qtd-simbolo');
    const tamanhoSimbolo = document.getElementById('tamanho-simbolo');
    const tamanhoValor = document.getElementById('tamanho-valor');
    const posicaoSimbolo = document.getElementById('posicao-simbolo');
    const btnDesenhar = document.getElementById('btn-desenhar');
    const btnSalvar = document.getElementById('btn-salvar');
    const uploadBandeira = document.getElementById('upload-bandeira');
    const arquivoSelecionado = document.getElementById('arquivo-selecionado');
    const previewImagem = document.getElementById('preview-imagem');
    const btnConfirmarUpload = document.getElementById('btn-confirmar-upload');
    const ideologiaSelecao = document.getElementById('ideologia-selecao');
    const formIdeologiaPropria = document.getElementById('form-ideologia-propria');

    // ATUALIZAR VALOR DO TAMANHO
    tamanhoSimbolo.addEventListener('input', function() {
        tamanhoValor.textContent = `${this.value}px`;
    });

    // DESENHAR BANDEIRA INICIAL
    desenharBandeira();

    // EVENTO PARA ATUALIZAR BANDEIRA
    btnDesenhar.addEventListener('click', desenharBandeira);

    // EVENTO PARA SALVAR BANDEIRA
    btnSalvar.addEventListener('click', function() {
        try {
            const link = document.createElement('a');
            link.download = `minha-bandeira-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            alert('Bandeira salva com sucesso! 🎉');
        } catch (error) {
            alert('Erro ao salvar a bandeira. Tente novamente!');
        }
    });

    // EVENTO PARA UPLOAD DE IMAGEM
    uploadBandeira.addEventListener('change', function(e) {
        const arquivo = e.target.files[0];
        if (arquivo) {
            arquivoSelecionado.textContent = `Arquivo: ${arquivo.name}`;
            const leitor = new FileReader();
            leitor.onload = function(event) {
                previewImagem.src = event.target.result;
            }
            leitor.readAsDataURL(
