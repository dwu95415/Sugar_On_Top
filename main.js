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
        {name:"rice",gram:"10",portion:"1"},
        {name:"black beans",gram:"5",portion:"1"},
        {name:"chicken",gram:"5",portion:"1"},
        {name:"tortilla",gram:"10",portion:"1"},
        {name:"cheese",gram:"10",portion:"1"},
        {name:"salsa",gram:"10",portion:"1"},
        {name:"lemonade",gram:"12",portion:"1"},
        {name:"cookie",gram:"20",portion:"1"}
      ];

  var add = function(foodName){
      for (i=0; i < items.length; i++){
        var name = items[i].name;
        var gram = items[i].gram;
        if(foodName == name){
          var item =
          '<li class=" list-group-item lf'+i+'"><div class="food" id="food'+i+'">'+name+'<div class="gram" id="gram'+i+'">'+gram+'g</div></div></li>'
          total += parseInt(gram)
          $(".well ul").append(item);
        }
      }
      $("#calculate").prop('disabled',false);
      $('#total').text('Total: '+total + 'g');
      $('#carb-intake').html(total+'g of Carbs');

  }

  $("#addFoodBtn").click(function(){
    query = $("#search").val()
    add(query);
  });

  var availableFoods = ["rice", "black beans", "chicken", "tortilla", "cheese", "salsa", "lemonade", "cookie"];

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
$("#calculate").prop('disabled',true);

    $('#add-item').click(function(){

      window.location = "saved.html";

      });

   $('#history').click(function(){
      window.location = "history/Chart.html"
    });

});
