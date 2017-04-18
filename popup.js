totalCarbs = 0;
icr = 0;
bloodSugar = 0;
var updateInsulin = function()
{
  if(icr != 0)
  {
    console.log('doin good');
    var ratio = Math.round(totalCarbs/icr);
    var extra = 0;
    if(bloodSugar >= 150)
      Math.round(extra = (bloodSugar-100)/50);
    var out = ratio + extra;
    $('#insulin').html('Inject '+ out +' units');
  }
  else{
    console.log('noooo');
    $('#insulin').html('Inject 0 units');
  }
}

$(document).on('keyup', function(evt) {
  var focusedElem = document.activeElement;
  if($(focusedElem).hasClass('input-num'))
  {
    if(focusedElem.id == 'total-carbs')
    {
      totalCarbs = $(focusedElem).val();
    } else if(focusedElem.id == 'icr'){
      icr = $(focusedElem).val();
    } else if(focusedElem.id == 'bloodSugar'){
      bloodSugar = $(focusedElem).val();
    }
    console.log(totalCarbs);
    console.log(icr);
    console.log(bloodSugar);
    updateInsulin();
  }
});

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
