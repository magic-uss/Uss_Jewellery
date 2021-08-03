'use strict';

(function () {
  var openCartButton = document.querySelector('.product__cart-button');
  var modal = document.querySelector('.cart-modal');
  var modalContent = document.querySelector('.cart-modal__content');
  var closeButton = document.querySelector('.cart-modal__close-button');
  var KEYCODE_TAB = 9;

  if (modalContent) {
    var focusableElements = modalContent.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), *[tabindex="0"]');
    var firstFocusableElement = focusableElements[0];
    var lastFocusableElement = focusableElements[focusableElements.length - 1];
  }

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
    firstFocusableElement.focus();

    window.addEventListener('resize', changeAlignment, false);
    window.addEventListener('keydown', onModalEscPress);
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', onModalOverlayPress);
    modalContent.addEventListener('keydown', loopFocus);
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
    modalContent.removeEventListener('keydown', loopFocus);
  }

  function loopFocus(evt) {
    var isTabPressed = (evt.key === 'Tab' || evt.keyCode === KEYCODE_TAB);

    if (!isTabPressed) {
      return;
    }

    if (evt.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        evt.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        evt.preventDefault();
      }
    }
  }

  if (modal && openCartButton && closeButton) {
    openCartButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      openModal();
    });
  }
})();
