$(document).on('click','.back',function(){
  window.history.back();
});
$(document).on('click','.food-item',function(){
  console.log('click');
  console.log($(this).css('background-color'));
  if($(this).hasClass('selected')){
    console.log('tru');
    $(this).removeClass('selected');
  } else {
    console.log('fal');
    $(this).addClass('selected');
  }

});

var addNewFood = function(text){
  console.log(text);
}
