totalCarbs = 0;
icr = 0;
bloodSugar = 0;
var out = 0;

var day = 0;

var updateInsulin = function()
{
  if(icr != 0 && bloodSugar != 0)
  {
    icr = $('#icr').val();
    carbs = $('#carb-intake').html();

    g_loc = carbs.indexOf('g');
    totalCarbs = parseInt(carbs.substring(0,g_loc));
    bloodSugar = $('#bloodSugar').val();
    // console.log('tot'+totalCarbs);
    // console.log(icr);
    // console.log(bloodSugar);
    // console.log('doin good');
    var ratio = Math.round(totalCarbs/icr);
    var extra = 0;
    if(bloodSugar >= 150)
      extra = Math.floor((bloodSugar-100)/50);
    out = ratio + extra;
    $('#insulin').html('Inject '+ out +' units');
  }
  else{

    // console.log('noooo');
    $('#insulin').html('Inject 0 units');
  }
  if(($("#icr").is(":focus") || $("#bloodSugar").is(":focus"))
      && (icr == 0 || bloodSugar == 0))
  {
    $('#insulin').addClass('invisible');
    $('#insulin').removeClass('visible');
  }
  else{
    $('#insulin').removeClass('invisible');
    $('#insulin').addClass('visible');
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

    updateInsulin();
  }
});

$(document).on('click','#calculate',function(){

  $('.popup-background').animate({
    opacity: .8
  }, 250,function(){
  });
  $('.carb-popup').animate({
    opacity: 1
  }, 250);
  $('.carb-popup').css('z-index',1);
  add();

});
$(document).on('click','#add-to-foods',function(){

  $('.popup-background').animate({
    opacity: .8
  }, 250,function(){
  });
  $('.save-popup').animate({
    opacity: 1
  }, 250);
  $('.save-popup').css('z-index',1);
  add();

});

// $(document).on('click','#save',function(){
//   // console.log('click');
//   $('.popup-background').animate({
//     opacity: .8
//   }, 250,function(){
//     // console.log('done');
//   });
//   $('.save-popup').animate({
//     opacity: 1
//   }, 250);
//   $('.save-popup').css('z-index',1);
//   add();
//
// });

//Used on the saved popup
$(document).on('click','#saved-close',function(){
  // console.log('click');
  $('.popup-background').animate({
    opacity: 0
  }, 250,function(){
    // console.log('done');
  });
  $('.popup').animate({
    opacity: 0
  }, 250,function(){
    remove();
    $('.popup').css('z-index',-1);
  });

});

$(document).on('click','#save-to-foods',function(){
  // console.log('click');
  $('.popup-background').animate({
    opacity: 0
  }, 250,function(){
    // console.log('done');
  });
  $('.popup').animate({
    opacity: 0
  }, 250,function(){
    remove();
    $('.popup').css('z-index',-1);
  });

});

//Used on the calculate popup
$(document).on('click','#calculate-close',function(){
  // console.log('click');
  $('.popup-background').animate({
    opacity: 0
  }, 250,function(){
    // console.log('done');
  });
  $('.popup').animate({
    opacity: 0
  }, 250,function(){
    remove();
    $('.popup').css('z-index',-1);
  });

});

$(document).on('click','#save-to-history',function(){
  // console.log('click');
  $('.popup-background').animate({
    opacity: 0
  }, 250,function(){
    // console.log('done');
  });
  $('.popup').animate({
    opacity: 0
  }, 250,function(){
    remove();
    $('.popup').css('z-index',-1);


  });


  updateData(out);

});

var updateData = function(out){

  var breakfast_data = JSON.parse(localStorage.getItem('breakfast'));
  var lunch_data = JSON.parse(localStorage.getItem('lunch'));
  var dinner_data = JSON.parse(localStorage.getItem('dinner'));

  var data;
  var date = new Date();
  var hour = date.getHours();
  if (hour > 3 && hour < 11){
      data = breakfast_data;
  }
  else if (hour > 11 && hour < 17){
    data = lunch_data;
  }
  else
    data = dinner_data
  
  if (data.length == 7 && date.getDay() != JSON.parse(localStorage.getItem('day'))){
    popData(dinner_data);
    popData(breakfast_data);
    popData(lunch_data);
    localStorage.setItem('day',JSON.stringify(date.getDay()));
  }


  data.push([data.length + 1,out]);

  localStorage.setItem('breakfast', JSON.stringify(breakfast_data));
  localStorage.setItem('lunch', JSON.stringify(lunch_data));
  localStorage.setItem('dinner', JSON.stringify(dinner_data));
}

var popData = function(data){
  for (var i = 0; i < data.length; i++){
    data[i][0] = data[i][0] - 1
  }
  data.shift();
}

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
  total_text = $('#total').html();
  g_loc = total_text.indexOf('g');
  col_loc = total_text.indexOf(' ');
  totalVal = parseInt(total_text.substring(col_loc,g_loc));
  $('#carb-intake').html(totalVal + 'g of Carbs');
  console.log(totalVal);
}
