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
