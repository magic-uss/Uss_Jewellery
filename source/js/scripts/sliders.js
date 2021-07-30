'use strict';

(function () {
  var productSlider = document.querySelector('.slider__container');

  if (productSlider) {
    new Swiper(productSlider, {
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
  }
   
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

  if (slider) {
    mobileSlider();
    window.addEventListener('resize', function () {
      mobileSlider();
    });
  }
})();
