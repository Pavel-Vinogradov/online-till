' use strict';



let modalLink = document.querySelectorAll('button[data-toggle="modal"]');
let modal = document.querySelector('.modal');
let modalClose = document.querySelector('.close');
let modalBtn = document.querySelector('.modal__btn');
let textTitleModal = document.querySelector('.modal-title');
let cardTitle = document.querySelectorAll('.product-card__title');

let copy = [];
 
cardTitle.forEach((item) => {
  copy.push(item.textContent);
});

// console.log(copy);

modalLink.forEach(element => {

  // element.setAttribute('data-title', 'Title');
  element.addEventListener('click', openModal);

  function openModal() {
    textTitleModal.textContent = 'dfd';
    document.body.style.overflow = 'hidden';
    modal.classList.add('show');
    modal.classList.add('modal--opened');
    modal.classList.remove('modal--closed');
  }

});


function closeModal(event) {
  let element = event.target;
  if (event.keyCode === 27 || modalClose.classList.contains('close')) {
    event.preventDefault();
    document.body.style.overflow = 'scroll';
    modal.classList.add('modal--closed');
    modal.classList.remove('show');
    modal.classList.remove('modal--opened');
  }
}

window.addEventListener('keydown', closeModal);
modalClose.addEventListener('click', closeModal);
modalBtn.addEventListener('click', closeModal);