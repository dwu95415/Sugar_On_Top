$(function() {
  var total = 0
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

    if (evt.target.id == "calculate"){
      console.log("calculate")
    }
    if (evt.target.id == "calculate"){
      console.log("calculate")
    }
    if (evt.target.id == "calculate"){
      console.log("calculate")
    }
    if (evt.target.id == "calculate"){
      console.log("calculate")
    }  });
});
