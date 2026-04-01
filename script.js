let carrinho = document.querySelector('carrinho');
let close = document.querySelector('close');
let body = document.querySelector('body');

carrinho.addEventListener('click', () => {
    body.classList.toggle('mostrar')
})
close.addEventListener('click', () => {
     body.classList.toggle('mostrar')
})