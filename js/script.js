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

//box slider owl

$(document).ready(function () {
   var sync1 = $('#sync1');
   var sync2 = $('#sync2');
   var slidesPerPage = 5;
   var syncedSecondary = true;

   sync1
      .owlCarousel({
         items: 1,
         slideSpeed: 2000,
         nav: true,
         autoplay: false,
         dots: false,
         loop: true,
         responsiveRefreshRate: 200,
         navText: [
            '<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>',
            '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'
         ]
      })
      .on('changed.owl.carousel', syncPosition);

   sync2
      .on('initialized.owl.carousel', function () {
         sync2.find('.owl-item').eq(0).addClass('current');
      })
      .owlCarousel({
         items: slidesPerPage,
         dots: false,
         nav: true,
         smartSpeed: 200,
         slideSpeed: 500,
         slideBy: 1,
         responsiveRefreshRate: 100
      })
      .on('changed.owl.carousel', syncPosition2);
   function syncPosition(el) {
      var count = el.item.count - 1;
      var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

      if (current < 0) {
         current = count;
      }
      if (current > count) {
         current = 0;
      }

      //end block

      sync2
         .find('.owl-item')
         .removeClass('current')
         .eq(current)
         .addClass('current');
      var onscreen = sync2.find('.owl-item.active').length - 1;
      var start = sync2.find('.owl-item.active').first().index();
      var end = sync2.find('.owl-item.active').last().index();

      if (current > end) {
         sync2.data('owl.carousel').to(current, 100, true);
      }
      if (current < start) {
         sync2.data('owl.carousel').to(current - onscreen, 100, true);
      }
   }

   function syncPosition2(el) {
      if (syncedSecondary) {
         var number = el.item.index;
         sync1.data('owl.carousel').to(number, 100, true);
      }
   }

   sync2.on('click', '.owl-item', function (e) {
      e.preventDefault();
      var number = $(this).index();
      sync1.data('owl.carousel').to(number, 300, true);
   });
});

//dropdown select

(function ($) {
   var CheckboxDropdown = function (el) {
      var _this = this;
      this.isOpen = false;
      this.areAllChecked = false;
      this.$el = $(el);
      this.$label = this.$el.find('.dropdown-label');
      this.$checkAll = this.$el.find('[data-toggle="check-all"]').first();
      this.$inputs = this.$el.find('[type="checkbox"]');

      this.onCheckBox();

      this.$label.on('click', function (e) {
         e.preventDefault();
         _this.toggleOpen();
      });

      this.$checkAll.on('click', function (e) {
         e.preventDefault();
         _this.onCheckAll();
      });

      this.$inputs.on('change', function (e) {
         _this.onCheckBox();
      });
   };

   CheckboxDropdown.prototype.onCheckBox = function () {
      this.updateStatus();
   };

   CheckboxDropdown.prototype.updateStatus = function () {
      var checked = this.$el.find(':checked');

      this.areAllChecked = false;
      this.$checkAll.html('Check All');

      if (checked.length <= 0) {
         this.$label.html('Select Category');
      } else if (checked.length === 1) {
         this.$label.html(checked.parent('label').text());
      } else if (checked.length === this.$inputs.length) {
         this.$label.html('All Selected');
         this.areAllChecked = true;
         this.$checkAll.html('Uncheck All');
      } else {
         this.$label.html(checked.length + ' Selected');
      }
   };

   CheckboxDropdown.prototype.onCheckAll = function (checkAll) {
      if (!this.areAllChecked || checkAll) {
         this.areAllChecked = true;
         this.$checkAll.html('Uncheck All');
         this.$inputs.prop('checked', true);
      } else {
         this.areAllChecked = false;
         this.$checkAll.html('Check All');
         this.$inputs.prop('checked', false);
      }

      this.updateStatus();
   };

   CheckboxDropdown.prototype.toggleOpen = function (forceOpen) {
      var _this = this;

      if (!this.isOpen || forceOpen) {
         this.isOpen = true;
         this.$el.addClass('on');
         $(document).on('click', function (e) {
            if (!$(e.target).closest('[data-control]').length) {
               _this.toggleOpen();
            }
         });
      } else {
         this.isOpen = false;
         this.$el.removeClass('on');
         $(document).off('click');
      }
   };

   var checkboxesDropdowns = document.querySelectorAll(
      '[data-control="checkbox-dropdown"]'
   );
   for (var i = 0, length = checkboxesDropdowns.length; i < length; i++) {
      new CheckboxDropdown(checkboxesDropdowns[i]);
   }
})(jQuery);

//state list

const states = [
   'Andhra Pradesh',
   'Arunachal Pradesh',
   'Assam',
   'Bihar',
   'Chhattisgarh',
   'Goa',
   'Gujarat',
   'Haryana',
   'Himachal Pradesh',
   'Jharkhand',
   'Karnataka',
   'Kerala',
   'Madhya Pradesh',
   'Maharashtra',
   'Manipur',
   'Meghalaya',
   'Mizoram',
   'Nagaland',
   'Odisha',
   'Punjab',
   'Rajasthan',
   'Sikkim',
   'Tamil Nadu',
   'Telangana',
   'Tripura',
   'Uttar Pradesh',
   'Uttarakhand',
   'West Bengal'
];

const searchInput = document.getElementById('search');
const stateList = document.getElementById('state-list');

// Populate the list with states
states.forEach((state) => {
   const li = document.createElement('li');
   li.textContent = state;
   stateList.appendChild(li);
});

// Show the dropdown when typing
searchInput.addEventListener('input', () => {
   const searchText = searchInput.value.toLowerCase();
   const listItems = stateList.querySelectorAll('li');
   stateList.style.display = searchText ? 'block' : 'none';

   listItems.forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.classList.toggle('hidden', !text.includes(searchText));
   });
});

// Handle item selection
stateList.addEventListener('click', (event) => {
   if (event.target.tagName === 'LI') {
      searchInput.value = event.target.textContent;
      stateList.style.display = 'none';
   }
});

// Hide dropdown on blur
document.addEventListener('click', (event) => {
   if (!event.target.closest('.dropdown')) {
      stateList.style.display = 'none';
   }
});
