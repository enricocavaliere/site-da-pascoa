
let carrinhoBtn = document.getElementById('carrinho');
let closeBtn = document.getElementById('fechar');
let pagamentoBtn = document.getElementById('pagamento')
let cartab = document.getElementById('cartab');

carrinhoBtn.addEventListener('click', () => {
    cartab.classList.remove('ocultar');
    cartab.classList.add('mostrar');
});

closeBtn.addEventListener('click', () => {
    cartab.classList.remove('mostrar');
    cartab.classList.add('ocultar');
});
/*/
pagamentoBtn.addEventListener('click', () => {
    cartab.classList.remove('mostrar');
    cartab.classList.add('pagamento');
})/*/

const valorDisplay = document.getElementById('valor');
const maisButton = document.getElementById('mais');
const menosButton = document.getElementById('menos');
const precoTotal = document.querySelector('.precoTotal');
const nomeCarrinho = document.querySelector('.nome');
const imgCarrinho = document.querySelector('.imgs img');


let quantidade = 0;
let precoUnitario = 0;
let intervalId = null;

//ARRAY
const produtos = [
    { nome: "Ovo de páscoa Chocolate ao leite",
      preco: 199,
      img: "./leite.webp"
    },
    { 
     nome: "Ovo de páscoa Oreo",
     preco: 250,
     img: "ovo milka.jpg"
    },
    { 
     nome: "Ovo de páscoa Amêndoas", 
     preco: 130, 
     img: "Almendras.webp" 
    },
    { 
     nome: "Ovo de páscoa Cookie", 
     preco: 199, 
     img: "cookie.png" 
    },
    { 
     nome: "Ovo de páscoa Creme avelã", 
     preco: 199, 
     img: "creme de avelã.png" 
    },
    { 
     nome: "Ovo de páscoa Pistache", 
     preco: 230, 
     img: "pistache.png" 
    },
    { 
     nome: "Ovo de páscoa Brigadeiro", 
     preco: 199, 
     img: "brigadeiro.png" 
    },
    {
     nome: "Ovo de páscoa Morango", 
     preco: 150, 
     img: "morango.png" 
    },
];


const updateCarrinhoUI = () => {
    if (quantidade < 0) quantidade = 0;
    valorDisplay.innerHTML = quantidade;
    let total = quantidade * precoUnitario;
    precoTotal.innerHTML = `R$ ${total.toFixed(2).replace('.', ',')}`;
};

const botoesAdicionar = document.querySelectorAll('.add');

botoesAdicionar.forEach((botao, index) => {
    botao.addEventListener('click', () => {

        const produtoSelecionado = produtos[index];

        nomeCarrinho.innerText = produtoSelecionado.nome;
        imgCarrinho.src = produtoSelecionado.img;
        precoUnitario = produtoSelecionado.preco;
        
        quantidade = 1;
    
        updateCarrinhoUI();
        cartab.classList.remove('ocultar');
        cartab.classList.add('mostrar');
    });
});

maisButton.addEventListener('mousedown', () => {
    quantidade++;
    updateCarrinhoUI();
    intervalId = setInterval(() => {
        quantidade++;
        updateCarrinhoUI();
    }, 150);
});

menosButton.addEventListener('mousedown', () => {
    if (quantidade > 0) {
        quantidade--;
        updateCarrinhoUI();
        intervalId = setInterval(() => {
            if (quantidade > 0) {
                quantidade--;
                updateCarrinhoUI();
            }
        }, 150);
    }
});

document.addEventListener('mouseup', () => clearInterval(intervalId));