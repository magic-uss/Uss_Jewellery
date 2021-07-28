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
