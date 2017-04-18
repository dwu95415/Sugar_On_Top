$(document).on('click','#calculate',function(){
  console.log('click');
  $('.popup-background').animate({
    opacity: .8
  }, 250,function(){
    console.log('done');
  });
  $('.popup').animate({
    opacity: 1
  }, 250);

  add();

});

$(document).on('click','#done',function(){
  console.log('click');
  $('.popup-background').animate({
    opacity: .2
  }, 250,function(){
    console.log('done');
  });
  $('.popup').animate({
    opacity: .2
  }, 250,function(){
    remove();
  });

});

$(document).on('click','#cancel',function(){
  console.log('click');
  $('.popup-background').animate({
    opacity: 0
  }, 250,function(){
    console.log('done');
  });
  $('.popup').animate({
    opacity: 0
  }, 250,function(){
    remove();
  });

});

var remove = function(){
  $('.popup-background').addClass('invisible');
  $('.popup-background').removeClass('visible');
  $('.popup').addClass('invisible');
  $('.popup').removeClass('visible');
}

var add = function(){
  $('.popup-background').removeClass('invisible');
  $('.popup-background').addClass('visible');
  $('.popup').removeClass('invisible');
  $('.popup').addClass('visible');
}
