'use strict';

(function () {
  var tabs = document.querySelectorAll('.form-catalog__wrapper');
  var clearButton = document.querySelector('.form-catalog__button--clear');
  var inputs = document.querySelectorAll('.form-catalog__inner input');
  var openFilterButton = document.querySelector('.catalog__filter-button');
  var filterForm = document.querySelector('.catalog__form-wrapper');
  var closeButton = document.querySelector('.form-catalog__close-button');

  function isEnterEvent(evt) {
    return evt.key === ('Enter');
  }

  function onTabEnterPress(evt) {
    if (isEnterEvent(evt)) {
      evt.preventDefault();
      toggleTabs(evt.target);
    }
  }

  function toggleTabs(tab) {
    if (tab.classList.contains('form-catalog__wrapper--closed')) {
      tab.classList.remove('form-catalog__wrapper--closed');
      tab.classList.add('form-catalog__wrapper--opened');

    } else {
      tab.classList.add('form-catalog__wrapper--closed');
      tab.classList.remove('form-catalog__wrapper--opened');
    }
  }

  if (tabs) {
    tabs.forEach(function (tab) {
      tab.classList.remove('form-catalog__wrapper--nojs');

      tab.addEventListener('click', function () {
        toggleTabs(tab);
      });

      window.addEventListener('keydown', onTabEnterPress);
    });
  }

  function clearInputs() {
    inputs.forEach(function (input) {
      if (input.checked) {
        input.checked = false;
      }
    });
  }

  function onClearEnterPress(evt) {
    if (isEnterEvent(evt)) {
      evt.preventDefault();
      clearInputs();
    }
  }

  if (clearButton && inputs) {
    clearButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      clearInputs();
    });
    window.addEventListener('keydown', onClearEnterPress);
  }

  function isEscEvent(evt) {
    return evt.key === ('Escape' || 'Esc');
  }

  function onFilterEscPress(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeFilter();
    }
  }

  function onFilterOverlayPress(evt) {
    if (evt.target !== filterForm) {
      evt.stopPropagation();
    } else {
      closeFilter();
    }
  }

  function onFilterEnterPress(evt) {
    if (isEnterEvent(evt)) {
      evt.preventDefault();
      openFilter();
    }
  }

  function openFilter() {
    filterForm.classList.remove('catalog__form-wrapper--closed');
    filterForm.classList.add('catalog__form-wrapper--opened');
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', onFilterEscPress);
    closeButton.addEventListener('click', closeFilter);
    filterForm.addEventListener('click', onFilterOverlayPress);
  }

  function closeFilter() {
    filterForm.classList.remove('catalog__form-wrapper--opened');
    filterForm.classList.add('catalog__form-wrapper--closed');
    document.body.removeAttribute('style');

    window.removeEventListener('keydown', onFilterEscPress);
    closeButton.removeEventListener('click', closeFilter);
    filterForm.removeEventListener('click', onFilterOverlayPress);
  }

  if (filterForm && openFilterButton && closeButton) {
    filterForm.classList.remove('catalog__form-wrapper--nojs');

    openFilterButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      openFilter();
    });
    window.addEventListener('keydown', onFilterEnterPress);
  }
})();
