var iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream;
var iPad = /iPad/.test(navigator.userAgent) && !window.MSStream;
var UAString = navigator.userAgent;
if(iPhone){
    $('body').addClass('iphone');
}
if(iPad){
    $('body').addClass('ipad');
}

if (UAString.toLowerCase().indexOf('safari') != -1) {
  if (UAString.toLowerCase().indexOf('chrome') > -1) {
    // alert("1") // Chrome
  } else {
    // alert("2") // Safari
    $('body').addClass('safari');
  }
}

if(UAString.indexOf("Edge") > -1) {
  $('body').addClass('edge');
}

if (UAString.indexOf("Trident") !== -1 && UAString.indexOf("rv:11") !== -1)
{
  $('body').addClass('ie');
}
if (UAString.indexOf("Trident") !== -1 && UAString.indexOf("rv:10") !== -1)
{
  $('body').addClass('ie');
}



$(document).ready(function(){

  // checking browser for WEBP
  hasWebP().then(function () {
    $('.webp-img').each(function () {
      var webp = $(this).data('webp');
      $(this).css('background-image', 'url('+ webp +')');
    });
  }, function () {
    $('.webp-img').each(function () {
      var img = $(this).data('img');
      $(this).css('background-image', 'url('+ img +')');
    });
  });


  $('#menu-btn').click(function () {
    $(this).closest('header').toggleClass('menu-open');
    $('#header-menu').toggleClass('open');
    $(this).toggleClass('show');
    $('body').toggleClass('oh');
  });

  $(document).on('click', function (e) {
    if($(e.target).closest('.header__nav.open').length === 0 && $('.header__nav.open').length > 0 && $(e.target).closest('#menu-btn').length === 0) {
      $('#header-menu').removeClass('open');
      $('#menu-btn').removeClass('show');
      $('body').removeClass('oh');
    }
  });

  $(document).scroll(function () {
    var top = $(document).scrollTop();

    if (top < 80) {
      $(".site-btn-top").removeClass('show');
    } else {
      $(".site-btn-top").addClass('show');
    }
  });

  $(document).on('click', '.site-btn-top', function (e) {
    jQuery('html,body').animate({scrollTop: 0},800);
  });

});


//script fro webp img and background
var hasWebP = (function () {
  // some small (2x1 px) test images for each feature
  var images = {
    basic: "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==",
    lossless: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA="
  };

  return function (feature) {
    var deferred = $.Deferred();

    $("<img>").on("load", function () {
      // the images should have these dimensions
      if (this.width === 2 && this.height === 1) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
    }).on("error", function () {
      deferred.reject();
    }).attr("src", images[feature || "basic"]);

    return deferred.promise();
  }
})();
