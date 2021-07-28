'use strict';

(function () {
  var openCartButton = document.querySelector('.product__cart-button');
  var modal = document.querySelector('.cart-modal');
  var modalContent = document.querySelector('.cart-modal__wrapper');
  var closeButton = document.querySelector('.cart-modal__close-button');

  function changeAlignment() {
    if (modalContent.clientHeight > modal.clientHeight) {
      if (modal.classList.contains('cart-modal--show')) {
        modal.classList.remove('cart-modal--show');
      }
      modal.classList.add('cart-modal--show-overflow');
    } else {
      if (modal.classList.contains('cart-modal--show-overflow')) {
        modal.classList.remove('cart-modal--show-overflow');
      }
      modal.classList.add('cart-modal--show');
    }
  }

  function isEscEvent(evt) {
    return evt.key === ('Escape' || 'Esc');
  }

  function onModalEscPress(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeModal();
    }
  }

  function onModalOverlayPress(evt) {
    if (evt.target !== modal) {
      evt.stopPropagation();
    } else {
      closeModal();
    }
  }

  function openModal() {
    modal.classList.add('cart-modal--show');
    changeAlignment();
    document.body.style.overflow = 'hidden';

    window.addEventListener('resize', changeAlignment, false);
    window.addEventListener('keydown', onModalEscPress);
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', onModalOverlayPress);
  }

  function closeModal() {
    if (modal.classList.contains('cart-modal--show')) {
      modal.classList.remove('cart-modal--show');
    }
    if (modal.classList.contains('cart-modal--show-overflow')) {
      modal.classList.remove('cart-modal--show-overflow');
    }
    document.body.removeAttribute('style');

    window.removeEventListener('resize', changeAlignment, false);
    window.removeEventListener('keydown', onModalEscPress);
    closeButton.removeEventListener('click', closeModal);
    modal.removeEventListener('click', onModalOverlayPress);
  }

  if (modal && openCartButton && closeButton) {
    openCartButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      openModal();
    });
  }
})();
