'use strict';

(function () {
  var openLoginButtons = document.querySelectorAll('.login-link');
  var modal = document.querySelector('.login-modal');
  var modalContent = document.querySelector('.login-modal__content');
  var closeButton = document.querySelector('.login-modal__close-button');
  var isStorageSupport = true;
  var storageEmail = '';
  var form = document.querySelector('.login-modal__form');
  var emailInput = form.querySelector('input[name="email"]');
  var formButton = form.querySelector('button');
  var KEYCODE_TAB = 9;

  if (modalContent) {
    var focusableElements = modalContent.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), *[tabindex="0"]');
    var firstFocusableElement = focusableElements[0];
    var lastFocusableElement = focusableElements[focusableElements.length - 1];
  }

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
    modalContent.addEventListener('keydown', loopFocus);
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
