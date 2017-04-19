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

  var add = function(){
    var items = [
        {name:"rice",gram:"10",portion:"1"},
        {name:"black beans",gram:"5",portion:"1"},
        {name:"chicken",gram:"5",portion:"1"},
        {name:"tortilla",gram:"10",portion:"1"},
        {name:"cheese",gram:"10",portion:"1"},
        {name:"salsa",gram:"10",portion:"1"},
        {name:"lemonade",gram:"12",portion:"1"},
        {name:"cookie",gram:"20",portion:"1"}
      ]
      for (i=0; i < items.length; i++){
        var name = items[i].name;
        var gram = items[i].gram;
        var item =
        '<li class=" active lf'+i+'"><div class="food" id="food'+i+'">'+name+'<div class="gram" id="gram'+i+'">'+gram+'g</div></div></li>'
        total += parseInt(gram)
        $(".well ul").append(item);
      }
  }

  var url_var_add = parseInt($.getUrlVar('add'));
  if(url_var_add==1)
  {
    add();
  }

  $(document).on('click', function(evt)
  {
    if (evt.target.id.startsWith('food')||(evt.target.id.startsWith('gram'))){
      num = evt.target.id.substring(4)
      if ($('li.lf'+num).hasClass('active')){
        $('li.lf'+num).removeClass('active')
        var current = $('#total').text().substring(6).slice(0,-1)
        var sub_total = $('#gram'+num).text().slice(0,-1)
        total -= parseInt(sub_total)
        $('#total').text('Total: '+total + 'g')

      } else {
        $('li.lf'+num).addClass('active')
        var current = $('#total').text().substring(6).slice(0,-1)
        var sub_total = $('#gram'+num).text().slice(0,-1)
        total += parseInt(sub_total)
        $('#total').text('Total: '+total + 'g')
      }
    }
    document.getElementById("total_carbs").value = total

  });

    $('#save').click(function() {
       window.location = "saved.html";
    });

    $('#add-item').click(function(){

      window.location = "search.html";

      });

   $('#history').click(function(){
      window.location = "history/Chart.html"
    });


      //  var item1= '<li class="lf1"><div class="food" id="food1">rice<div class="gram" id="gram1">10g</div></div></li>'
      //  var item2= '<li class="lf2"><div class="food" id="food2">black beans <div class='gram' id="gram2">5g</div></div></li>'
      //          <li class="lf3"><div class='food' id='food3'>chicken <div class='gram' id="gram3">5g</div></div></li>
      //          <li class="lf4"><div class='food' id='food4'>tortilla <div class='gram' id="gram4">10g</div></div></li>
      //          <li class="lf5"><div class='food' id='food5'>cheese <div class='gram' id="gram5">10g</div></div></li>
      //          <li class="lf6"><div class='food' id='food6'>salsa <div class='gram' id="gram6">10g</div></div></li>
      //         <li class="lf7"><div class='food' id='food7'>lemonade <div class='gram' id="gram7">12g</div></div></li>
      //         <li class="lf8"><div class='food' id='food8'>cookie <div class='gram' id="gram8">20g</div></div></li>'



});
