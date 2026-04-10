
let carrinhoCompra = [];

let carrinhoBtn = document.getElementById('carrinho');
let closeBtn = document.getElementById('fechar');
let pagamentoBtn = document.getElementById('pay');
let cartab = document.getElementById('cartab');


// Abrir e fechar carrinho
carrinhoBtn.addEventListener('click', () => {
    cartab.classList.remove('ocultar');
    cartab.classList.add('mostrar');
});

closeBtn.addEventListener('click', () => {
    cartab.classList.remove('mostrar');
    cartab.classList.add('ocultar');
});

pagamentoBtn.addEventListener('click', () => {
    cartab.classList.remove('mostrar');
    cartab.classList.remove('pay');
});

// ARRAY DE PRODUTOS
const produtos = [
    { nome: "Ovo de páscoa Chocolate ao leite", preco: 199, img: "./leite.webp" },
    { nome: "Ovo de páscoa Oreo", preco: 259, img: "ovo milka.jpg" },
    { nome: "Ovo de páscoa Amêndoas", preco: 130, img: "Almendras.webp" },
    { nome: "Ovo de páscoa Cookie", preco: 199, img: "cookie.png" },
    { nome: "Ovo de páscoa Creme avelã", preco: 199, img: "creme de avelã.png" },
    { nome: "Ovo de páscoa Pistache", preco: 249, img: "pistache.png" },
    { nome: "Ovo de páscoa Brigadeiro", preco: 199, img: "brigadeiro.png" },
    { nome: "Ovo de páscoa Morango", preco: 150, img: "morango.png" },
];

// RENDERIZAR VITRINE
let ListaProdutos = document.getElementById("ListaProdutos");
let caixaProduto = '';
produtos.forEach((element, index) => {
    caixaProduto += `<div class="caixa">
                        <img id="ftOvo" src="./${element.img}" alt="">
                        <h2>${element.nome}</h2>
                        <p class="preco">R$ ${element.preco}</p>
                        <button class="add" value="${index}">Adicionar ao carrinho</button>    
                    </div>`;
});
ListaProdutos.innerHTML = caixaProduto;

// FUNÇÃO PARA ATUALIZAR A INTERFACE DO CARRINHO
const updateCarrinhoUI = () => {
    let listCart = document.querySelector('.listCart');
    listCart.innerHTML = ''; // Limpa o HTML atual para reconstruir com a lista nova

    if (carrinhoCompra.length === 0) {
        listCart.innerHTML = '<div class="item"><div class="nome">SEU CARRINHO ESTÁ VAZIO</div></div>';
        return;
    }

    carrinhoCompra.forEach((item, index) => {
        listCart.innerHTML += `
        <div class="item">
                <div class="imgs">
                    <img src="${item.img}" alt="">
                </div>
                <div class="nome">
                    ${item.nome}
                </div>
                <div class="precoTotal">
                    R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
                </div>
                <div id="quantidade">
                    <button class="botao" id="menos" onclick="alterarQuantidade(${index}, -1)">
                        -
                    </button>
                    <span id="valor">${item.quantidade}</span>
                    <button class="botao" id="mais" onclick="alterarQuantidade(${index}, 1)">
                        +
                    </button>
                </div>
            </div>`;
    });
};

// EVENTO DE ADICIONAR
const botoesAdicionar = document.querySelectorAll('.add');
botoesAdicionar.forEach((botao) => {
    botao.addEventListener('click', () => {
        const idProduto = botao.getAttribute("value");
        const produtoSelecionado = produtos[idProduto];

        // Verifica se o produto já existe no carrinho
        const itemExistente = carrinhoCompra.find(item => item.nome === produtoSelecionado.nome);

        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            // Adiciona novo objeto ao array
            carrinhoCompra.push({
                nome: produtoSelecionado.nome,
                preco: produtoSelecionado.preco,
                img: produtoSelecionado.img,
                quantidade: 1
            });
        }

        updateCarrinhoUI();
        cartab.classList.remove('ocultar');
        cartab.classList.add('mostrar');
    });
});


// FUNÇÃO PARA BOTÕES DE + E - DENTRO DO CARRINHO
window.alterarQuantidade = (index, valor) => {
    carrinhoCompra[index].quantidade += valor;
    
    // Se a quantidade chegar a 0, removemos o item da lista
    if (carrinhoCompra[index].quantidade <= 0) {
        carrinhoCompra.splice(index, 1);
    }
    
    updateCarrinhoUI();
};

pagamentoBtn.addEventListener('click', () => {
    if (carrinhoCompra.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let listCart = document.querySelector('.listCart');
    
    // Calcula o valor total de todos os itens
    const totalGeral = carrinhoCompra.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);

    // Substitui a lista de produtos pelas opções de pagamento
    listCart.innerHTML = `
        <div style="padding: 20px; text-align: center;">
            <h2>Finalizar Compra</h2>
            <p style="font-size: 1.4rem; margin: 20px 0;"><strong>Total: R$ ${totalGeral.toFixed(2).replace('.', ',')}</strong></p>
            <hr>
            <p>Escolha o método de pagamento:</p>
            <div style="text-align: left; display: inline-block; margin: 15px 0;">
                <label><input type="radio" name="metodo" value="Pix"> Pix</label><br>
                <label><input type="radio" name="metodo" value="Cartão de Crédito"> Cartão de Crédito</label><br>
                <label><input type="radio" name="metodo" value="Boleto"> Boleto</label>
            </div>
            <br>
            <button onclick="updateCarrinhoUI()" style="margin-right: 10px; cursor: pointer;">Voltar</button>
            <button onclick="confirmarPedido()" style="background-color: #4b2d89; color: white; border: none; padding: 10px 20px; cursor: pointer; border-radius: 5px;">Confirmar Pedido</button>
        </div>
    `;
});

// Função para o botão final de confirmação
window.confirmarPedido = () => {
    const selecionado = document.querySelector('input[name="metodo"]:checked');
    if (selecionado) {
        alert("Pedido confirmado via " + selecionado.value + "! Obrigado pela compra.");
        carrinhoCompra = []; // Limpa o carrinho
        updateCarrinhoUI();
        cartab.classList.add('ocultar');
    } else {
        alert("Por favor, selecione uma forma de pagamento.");
    }
};  