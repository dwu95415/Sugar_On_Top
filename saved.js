
var selected = 0;

$(document).on('click','#save',function(){
    window.location = "index.html";

});
    // $('#save').click(function(){
    //
    //
    //   });

$(document).on('click','.back',function(){
  window.history.back();
});
$(document).on('click','.food-item',function(){
  console.log('click');
  console.log($(this).css('background-color'));
  if($(this).hasClass('selected')){
    console.log('tru');
    $(this).removeClass('selected');
    selected -= 1;
  } else {
    console.log('fal');
    $(this).addClass('selected');
    selected += 1;
  }

});

var addNewFood = function(text){
  console.log(text);
}

$(document).on('click','.addFood',function(){
  console.log()
  if (selected > 0){
    window.location = "index.html?add=" + encodeURIComponent(1);
  }
});
