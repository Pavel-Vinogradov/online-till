' use strict';



let modalLink = document.querySelectorAll('button[data-toggle="modal"]');
let modal = document.getElementById('modal');
let modalClose = document.querySelector('.close');
let modalBtn = document.querySelector('.modal__btn');
let textTitleModal = document.querySelector('.modal-title');
let cardTitle = document.querySelectorAll('.product-card__title');
let copy = [];
let count = '';

cardTitle.forEach((item) => {
  copy.push(item.textContent);
});


for (let i = 0, j = 1; i < copy.length, j < modalLink.length; i++, j++) {
  const element1 = copy[i];
  const element2 = modalLink[j];
  element2.setAttribute('data-title', element1);

}


modalLink.forEach(element => {

  element.addEventListener('click', openModal);
  function openModal() {
    textTitleModal.textContent = 'Заказать' + ' ' + this.getAttribute('data-title');
    document.body.style.overflow = 'hidden';
    modal.classList.add('show');
    modal.classList.add('modal--opened');
    modal.classList.remove('modal--closed');
  }

});


function closeModal() {
  {
    document.body.style.overflow = 'scroll';
    modal.classList.add('modal--closed');
    modal.classList.remove('show');
    modal.classList.remove('modal--opened');
  }
}


modalClose.addEventListener('click', closeModal);
modalBtn.addEventListener('click', closeModal);