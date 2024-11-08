$('.exclusive-selection').owlCarousel({
   margin: 25,
   loop: true,
   center: false,
   items: 3.6,
   autoplay: true,
   dots: false,
   nav: true,
   autoplayTimeout: 8500,
   smartSpeed: 450,
   navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>'
   ],
   responsive: {
      0: {
         items: 1
      },
      768: {
         items: 2
      },
      1170: {
         items: 3.6
      }
   }
});

// form hide/show

$(document).on('click', '.pass-view', function (event) {
   var $open = $(this).children('.fa-eye');
   var $close = $(this).children('.fa-eye-slash');
   var $pass = $(this).siblings('.pass');
   if ($open.is(':visible')) {
      $close.show();
      $open.hide();
      $pass.attr('type', 'text');
   } else {
      $close.hide();
      $open.show();
      $pass.attr('type', 'password');
   }
});
