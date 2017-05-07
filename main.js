$(function() {
  var total = 0

  // A short jQuery extension to read query parameters from the URL.
  $.extend({
    getUrlVars: function() {
      var vars = [], pair;
      var pairs = window.location.search.substr(1).split('&');
      for (var i = 0; i < pairs.length; i++) {
        pair = pairs[i].split('=');
        vars.push(pair[0]);
        vars[pair[0]] = pair[1] &&
            decodeURIComponent(pair[1].replace(/\+/g, ' '));
      }
      return vars;
    },
    getUrlVar: function(name) {
      return $.getUrlVars()[name];
    }
  });

  var items = [
        {name:"Rice",gram:"10",portion:"1"},
        {name:"Black Beans",gram:"5",portion:"1"},
        {name:"Chicken",gram:"5",portion:"1"},
        {name:"Tortilla",gram:"10",portion:"1"},
        {name:"Cheese",gram:"10",portion:"1"},
        {name:"Salsa",gram:"10",portion:"1"},
        {name:"Lemonade",gram:"12",portion:"1"},
        {name:"Cookie",gram:"20",portion:"1"}
      ];
  var savedFoods = window.localStorage.getItem("savedFoods");
  if(savedFoods == null){
    savedFoods =[
        {name:"Cheeseburger",gram:"30",portion:"1"},
        {name:"Spaghetti",gram:"40",portion:"1"}
      ];
  }
  else{
    savedFoods = JSON.parse(savedFoods);
  }


  $("#save-to-foods").click(function(){
    var foodName = $('#save-food-name').val();
    var newItem = {name: foodName, gram: "" + recalculate_total(), portion:"1"};
    savedFoods.push(newItem);
  });
  //var availableFoods = ["Rice", "Black Beans", "Chicken", "Tortilla", "Cheese", "Salsa", "Lemonade", "Cookie"];
  var availableFoods = [];
  $.each(items, function(key, value){
    availableFoods.push(value.name);
  });
  $.each(savedFoods, function(key, value){
    availableFoods.push(value.name);
  });
  var num_ingredients = 0;

  var add = function(foodName){

      for (i=0; i < items.length + savedFoods.length; i++){
        if(i<items.length){
          var name = items[i].name;
          var gram = items[i].gram;
        }
        else{
          var name = savedFoods[i-items.length].name;
          var gram = savedFoods[i-items.length].gram;
        }
        if(foodName.toLowerCase() == name.toLowerCase()){
          num_ingredients +=1;
          var item =
          '<li class=" list-group-item lf'+i+'"><span class=close-list aria-hidden="true">&times;</span><div class="food" id="food'+i+'">'+name +'</div>'+
          '<div class="portion-container">' +
          '<label><input type="radio" name="portion-size' + num_ingredients +'" value="' + gram +'" checked="checked" /><img src="icons/size_1.png"></label>' +
          '<label> <input type="radio" name="portion-size' + num_ingredients +'" value="' + 2 * gram +'" /><img src="icons/size_2.png"></label>' +
          '<label> <input type="radio" name="portion-size' + num_ingredients +'" value="' + 3 * gram +'" /><img src="icons/size_3.png"></label>' +
          '<label> <input type="radio" name="portion-size' + num_ingredients +'" value="' + 4 * gram +'" /><img src="icons/size_4.png"></label>' +
          '<p class="gram" id="gram'+num_ingredients+'">'+gram+'g</p></div>'+
          '</div></li>';
          $("#add-to-foods").prop('disabled',false);
          $("#calculate").prop('disabled',false);
          $(".well ul").append(item);
          // Radio button listener
          $("input:radio").change(function(){
            if ($(this).is(':checked'))
            {
              $(this).parent().siblings("p").text($(this).val()+"g");
            }
            recalculate_total();
          });
          // Delete list item listener
          $(".close-list").click(function(){
            $(this).parent().remove();
            var total = recalculate_total();
            if (total == 0){
                $("#add-to-foods").prop('disabled',true);
                $("#calculate").prop('disabled',true);
            }
          });
        }

      }
      $('#total').text('Total: '+total + 'g');
      $('#carb-intake').html(total+'g of Carbs');
      recalculate_total();
      //$('#total').text('Total: '+total + 'g')

  }

  var recalculate_total = function(){
    var total = 0;
    $("input:radio").each(function(){
       if ($(this).is(':checked'))
            {
              total += parseInt($(this).val());
            }
    });
    $("#total").text('Total: '+total + 'g')
    return total
  }

  $("#addFoodBtn").click(function(){
    query = $("#search").val()
    add(query);
  });


  $( "#search" ).autocomplete({
      source: availableFoods,
      scroll:true,
      minLength:0,
      messages: {
        noResults: '',
        results: function() {}
    }
  }).focus(function() {
            query = $("#search").val();
            $(this).autocomplete("search", query);
  });

  jQuery.ui.autocomplete.prototype._resizeMenu = function () {
    var ul = this.menu.element;
    ul.outerWidth(this.element.outerWidth());
  }

  var url_var_add = parseInt($.getUrlVar('add'));
  if(url_var_add==1)
  {
    add();
  }

  $(document).on('click', function(evt)
  {
    if (evt.target.id =='food-name')
      return;

    if (evt.target.id.startsWith('food')||(evt.target.id.startsWith('gram'))){
      num = evt.target.id.substring(4)
    //   if ($('li.lf'+num).hasClass('active')){
    //     $('li.lf'+num).removeClass('active')
    //     var current = $('#total').text().substring(6).slice(0,-1)
    //     var sub_total = $('#gram'+num).text().slice(0,-1)
    //     total -= parseInt(sub_total)
    //     $('#total').text('Total: '+total + 'g')
    //
    //   } else {
    //     $('li.lf'+num).addClass('active')
    //     var current = $('#total').text().substring(6).slice(0,-1)
    //     var sub_total = $('#gram'+num).text().slice(0,-1)
    //     total += parseInt(sub_total)
    //     $('#total').text('Total: '+total + 'g')
    //   }
    // }
    // $("#total_carbs").text(total);
}

  });

    // $('#save').click(function() {
    //    window.location = "saved.html";
    // });
// $("#calculate").property

$("#add-to-foods").prop('disabled',true);
$("#calculate").prop('disabled',true);

    $('#add-item').click(function(){
      window.localStorage.setItem("savedFoods", JSON.stringify(savedFoods));
      window.location = "saved.html";

      });

   $('#history').click(function(){
      window.localStorage.setItem("savedFoods", JSON.stringify(savedFoods));
      window.location = "history/Chart.html"
    });

});
