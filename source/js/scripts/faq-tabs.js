'use strict';

(function () {
  var tabs = document.querySelectorAll('.faq__item');

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
    if (item.classList.contains('faq__item--closed')) {
      item.classList.remove('faq__item--closed');
      item.classList.add('faq__item--opened');
    } else if (item.classList.contains('faq__item--opened')) {
      item.classList.add('faq__item--closed');
      item.classList.remove('faq__item--opened');
    }
  }

  if (tabs) {
    tabs.forEach(function (tab) {
      tab.classList.remove('faq__item--nojs');

      tab.addEventListener('click', function () {
        toggleTabs(tab);
      });

      window.addEventListener('keydown', onTabEnterPress);
    });
  }
})();
