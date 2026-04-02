let carrinho = document.getElementById('carrinho');
let close = document.getElementById('fechar');
let body = document.querySelector('body');
let cartab = document.getElementById('cartab');


carrinho.addEventListener('click', () => {
    cartab.classList.remove('ocultar');
    cartab.classList.add('mostrar');
});
close.addEventListener('click', () => {
    cartab.classList.remove('mostrar');
    cartab.classList.add('ocultar');
});

const valor = document.getElementById ('valor');
const maisButton = document.getElementById('mais');
const menosButton = document.getElementById('menos');

const updtadeValor = () => {
    valor.innerHTML = quantidade;
};
let quantidade= 0;
let intervalId = 0;
maisButton.addEventListener('mousedown', () => {
    intervalId = setInterval (() => {
        quantidade += 1;
        updtadeValor()
    }, 100);
});