
let carrinho = document.getElementById('carrinho');
let close = document.getElementById('fechar');
let cartab = document.getElementById('cartab');

carrinho.addEventListener('click', () => {
    cartab.classList.remove('ocultar');
    cartab.classList.add('mostrar');
});

close.addEventListener('click', () => {
    cartab.classList.remove('mostrar');
    cartab.classList.add('ocultar');
});

// Lógica de Quantidade e Preço
const valorDisplay = document.getElementById('valor');
const maisButton = document.getElementById('mais');
const menosButton = document.getElementById('menos');
const precoTotal = document.querySelector('.precoTotal'); // Seleciona o campo de preço no carrinho
const nome = document.querySelector('.nome')

let quantidade = 0;
let precoUnitario = 199.00; // Valor definido no seu HTML
let intervalId = null;

// Função que atualiza o texto da quantidade e o preço total na tela
const updateCarrinho = () => {
    // Garante que a quantidade não seja negativa
    if (quantidade < 0) quantidade = 0;

    // Atualiza o número da quantidade
    valorDisplay.innerHTML = quantidade;

    // Calcula o total
    let total = quantidade * precoUnitario

    // Atualiza o texto do preço formatado como moeda brasileira
    precoTotal.innerHTML = `R$ ${total.toFixed(2).replace('.', ',')}`;
};

// Função para aumentar
maisButton.addEventListener('mousedown', () => {
    quantidade++;
    updateCarrinho();
    intervalId = setInterval(() => {
        quantidade++;
        updateCarrinho();
    }, 100); // Aumenta enquanto segura o botão
});

// Função para diminuir
menosButton.addEventListener('mousedown', () => {
    if (quantidade > 0) {
        quantidade--;
        updateCarrinho();
        intervalId = setInterval(() => {
            if (quantidade > 0) {
                quantidade--;
                updateCarrinho();
            }
        }, 100);
    }
});

// Para de contar quando solta o mouse
document.addEventListener('mouseup', () => {
    clearInterval(intervalId);
});