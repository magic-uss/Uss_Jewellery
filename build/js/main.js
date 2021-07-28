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

'use strict';

(function () {
  var tabs = document.querySelectorAll('.faq__item');

  if (tabs) {
    tabs.forEach(function (tab) {
      tab.classList.remove('faq__item--nojs');

      tab.addEventListener('click', function () {
        if (tab.classList.contains('faq__item--closed')) {
          tab.classList.remove('faq__item--closed');
          tab.classList.add('faq__item--opened');

        } else {
          tab.classList.add('faq__item--closed');
          tab.classList.remove('faq__item--opened');
        }
      });
    });
  }
})();

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

'use strict';

(function () {
  var menu = document.querySelector('.page-header');
  var navToggle = document.querySelector('.user-menu__nav-toggle');

  if (menu && navToggle) {
    menu.classList.remove('page-header--nojs');

    navToggle.addEventListener('click', function () {
      if (menu.classList.contains('page-header--closed')) {
        menu.classList.remove('page-header--closed');
        menu.classList.add('page-header--opened');
        document.body.style.overflow = 'hidden';
      } else {
        menu.classList.add('page-header--closed');
        menu.classList.remove('page-header--opened');
        document.body.removeAttribute('style');
      }
    });
  }
})();

'use strict';

(function () {
  new Swiper('.slider__container', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.slider__pagination',
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: '.slider__pagination',
          clickable: false,
          type: 'fraction',
          renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' + ' of ' + '<span class="' + totalClass + '"></span>';
          },
        },
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: '.slider__pagination',
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          },
        },
      },
      1024: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        pagination: {
          el: '.slider__pagination',
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          },
        },
      }
    },
    simulateTouch: false,
    spaceBetween: 30,
    watchOverflow: true,
    loop: true,
    speed: 800,
  });

  var slider = document.querySelector('.product__slider');
  var productPagination = document.querySelector('.product__pagination');
  var gallerySwiper;

  function mobileSlider() {
    if (window.innerWidth <= 767 && slider.dataset.mobile === 'false') {
      document.querySelector('.product__slider').classList.add('swiper-container');
      document.querySelector('.product__gallery').classList.add('swiper-wrapper');
      productPagination.classList.add('swiper-pagination');
      gallerySwiper = new Swiper(slider, {
        slidesPerView: 1,
        slidesPerGroup: 1,
        loop: true,
        speed: 800,
        pagination: {
          el: '.product__pagination',
          clickable: false,
          type: 'fraction',
          renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' + ' of ' + '<span class="' + totalClass + '"></span>';
          },
        },
      });
      slider.dataset.mobile = 'true';
    }

    if (window.innerWidth > 767) {
      if (slider) {
        slider.dataset.mobile = 'false';
        if (slider.classList.contains('swiper-container-initialized')) {
          gallerySwiper.destroy();
          document.querySelector('.product__slider').classList.remove('swiper-container');
          document.querySelector('.product__gallery').classList.remove('swiper-wrapper');
          productPagination.classList.remove('swiper-pagination');
          productPagination.innerHTML = '';
        }
      }
    }
  }

  mobileSlider();
  window.addEventListener('resize', function () {
    mobileSlider();
  });
})();
