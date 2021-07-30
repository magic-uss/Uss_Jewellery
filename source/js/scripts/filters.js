'use strict';

(function () {
  var filterTabs = document.querySelectorAll('.form-catalog__inner');
  var clearButton = document.querySelector('.form-catalog__button--clear');
  var inputs = document.querySelectorAll('.form-catalog__inner input');
  var openFilterButton = document.querySelector('.catalog__filter-button');
  var filterForm = document.querySelector('.catalog__form');
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

  function toggleTabs(item) {
    if (item.classList.contains('form-catalog__inner--closed')) {
      item.classList.remove('form-catalog__inner--closed');
      item.classList.add('form-catalog__inner--opened');
    } else if (item.classList.contains('form-catalog__inner--opened')) {
      item.classList.add('form-catalog__inner--closed');
      item.classList.remove('form-catalog__inner--opened');
    }
  }

  if (filterTabs) {
    filterTabs.forEach(function (filterTab) {
      filterTab.classList.remove('form-catalog__inner--nojs');

      filterTab.addEventListener('click', function (evt) {
        if (evt.target === filterTab) {
          toggleTabs(filterTab);
        }
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
      if (evt.target === clearButton) {
        evt.preventDefault();
        clearInputs();
      }
    });
    window.addEventListener('keydown', function (evt) {
      if (evt.target === clearButton) {
        onClearEnterPress(evt);
      }
    });
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
      openFilter(evt);
    }
  }

  function openFilter(evt) {
    if (evt.target === openFilterButton) {
      filterForm.classList.remove('catalog__form--closed');
      filterForm.classList.add('catalog__form--opened');
      document.body.style.overflow = 'hidden';

      window.addEventListener('keydown', onFilterEscPress);
      closeButton.addEventListener('click', closeFilter);
      filterForm.addEventListener('click', onFilterOverlayPress);
    }
  }

  function closeFilter() {
    filterForm.classList.remove('catalog__form--opened');
    filterForm.classList.add('catalog__form--closed');
    document.body.removeAttribute('style');

    window.removeEventListener('keydown', onFilterEscPress);
    closeButton.removeEventListener('click', closeFilter);
    filterForm.removeEventListener('click', onFilterOverlayPress);
  }

  if (filterForm && openFilterButton && closeButton) {
    filterForm.classList.remove('catalog__form--nojs');

    openFilterButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      openFilter(evt);
    });
    window.addEventListener('keydown', onFilterEnterPress);
  }
})();
