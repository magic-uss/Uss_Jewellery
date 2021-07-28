'use strict';

(function () {
  var openLoginButtons = document.querySelectorAll('.login-link');
  var modal = document.querySelector('.login-modal');
  var modalContent = document.querySelector('.login-modal__wrapper');
  var closeButton = document.querySelector('.login-modal__close-button');
  var isStorageSupport = true;
  var storageEmail = '';
  var form = document.querySelector('.login-modal__form');
  var emailInput = form.querySelector('input[name="email"]');
  var formButton = form.querySelector('button');

  try {
    storageEmail = localStorage.getItem('email');
  } catch (err) {
    isStorageSupport = false;
  }

  if (storageEmail) {
    emailInput.value = storageEmail;
  }

  if (emailInput && formButton) {
    form.addEventListener('submit', function () {
      if (isStorageSupport) {
        localStorage.setItem('email', emailInput.value);
      }
    });
  }

  function changeAlignment() {
    if (modalContent.clientHeight > modal.clientHeight) {
      if (modal.classList.contains('login-modal--show')) {
        modal.classList.remove('login-modal--show');
      }
      modal.classList.add('login-modal--show-overflow');
    } else {
      if (modal.classList.contains('login-modal--show-overflow')) {
        modal.classList.remove('login-modal--show-overflow');
      }
      modal.classList.add('login-modal--show');
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
    modal.classList.add('login-modal--show');
    changeAlignment();
    document.body.style.overflow = 'hidden';
    emailInput.focus();

    window.addEventListener('resize', changeAlignment, false);
    window.addEventListener('keydown', onModalEscPress);
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', onModalOverlayPress);
  }

  function closeModal() {
    if (modal.classList.contains('login-modal--show')) {
      modal.classList.remove('login-modal--show');
    }
    if (modal.classList.contains('login-modal--show-overflow')) {
      modal.classList.remove('login-modal--show-overflow');
    }
    document.body.removeAttribute('style');

    window.removeEventListener('resize', changeAlignment, false);
    window.removeEventListener('keydown', onModalEscPress);
    closeButton.removeEventListener('click', closeModal);
    modal.removeEventListener('click', onModalOverlayPress);
  }

  if (openLoginButtons) {
    openLoginButtons.forEach(function (openLoginButton) {
      if (modal && closeButton) {
        openLoginButton.addEventListener('click', function (evt) {
          evt.preventDefault();
          openModal();
        });
      }
    });
  }
})();
