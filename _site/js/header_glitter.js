(function($) {
  "use strict";

  var $emptyHeaders= $('.blog-no-header').parents('.post-header');
  $emptyHeaders.parents('.post-item').addClass('no-header');
  $emptyHeaders.remove();

  var $contactwrapper= $('#contact-wrapper');

  $('#contact-section').on('click', function (e) {
    e.preventDefault();
    $contactwrapper.animate({ top: 0 }, 300);
  });

  $('#contact-close').on('click',function (e){
    e.preventDefault();
    $contactwrapper.animate({ top: '100%' }, 300);
  });

  $('.fiddleLink').on('click', function (e) {
    e.preventDefault();
    $('.fiddleImg').toggleClass('visible');
    $('.fiddlePic').toggleClass('bordered');
  });

})(jQuery);