// var FOOD_DATABASE = ["Chicken", "Beans", "Rice", "Whole Wheat Tortilla", "White Tortilla", "Pork", "Beef"]
var FOOD_DATABASE= [
		{name:"rice",gram:"10",portion:"1"},
		{name:"black beans",gram:"5",portion:"1"},
		{name:"chicken",gram:"5",portion:"1"},
		{name:"tortilla",gram:"10",portion:"1"},
		{name:"cheese",gram:"10",portion:"1"},
		{name:"salsa",gram:"10",portion:"1"},
		{name:"lemonade",gram:"12",portion:"1"},
		{name:"cookie",gram:"20",portion:"1"}
	]

var basket = []
the_id = 0;
var show_search_results = function(food_name){
	$("#search-results").html('');
	var hasResult = false;
	for(i=0; i < FOOD_DATABASE.length; i++)
	{
		if(FOOD_DATABASE[i].name.toLowerCase().indexOf(food_name.toLowerCase())!==-1)
		{
			var resultHtml = generate_result_html(FOOD_DATABASE[i]);
			$("#search-results").append(resultHtml);
			hasResult = true;
		}
	}
	if(!hasResult)
	{
		var resultHtml = generate_no_results_html(food_name);
		$("#search-results").append(resultHtml);
	}
}

var generate_result_html= function(food){
	// html =
	// 	"<div class='searchResult'>" +
	// 		"<div class='resultName col-md-6'>" + food_name +"</div>" +
	// 		//"<div class='resultOptions col-md-2 col-md-push-3'>" +
	// 		"<button class='btn btn-lg add-button' type='submit' value='"+food_name+"'>Add to Basket</button> </div>";
	html =
	'<li class="searchResult lf'+the_id+'"><div class="resultName" id="food'+the_id+'">'+food.name+'<div class="gram" id="gram'+the_id+'">'+ food.gram+'g</div></div></li>'

		// "<div class='searchResult'>" +
		// 	"<div class='resultName col-md-6' id=food"+the_id+">" + food_name +"</div></div>";
		the_id += 1

	return html;
}

var generate_basket_html = function(food_name){
	html =
		"<div class='basketResult'>" +
			"<div class='resultName col-md-6'>" + food_name +"</div>" +
			"<div class='resultOptions col-md-2 col-md-push-3'>" +
			"<button class='btn btn-default remove-button' type='submit' value='"+food_name+"'>Remove</button></div></div>";
	return html;
}

var generate_no_results_html = function(food_name){
	var html = "<div class = 'noResults'>" + food_name +" was not found </div>";
	return html;
}


$(document).ready(function(){
	$("#searchSubmit").click(function()
		{
			var search_term = $("#search").val();
			show_search_results(search_term);
		});

	$("#search").keypress(function(e){
		if(e.which==13){
			show_search_results(e.target.value);
		}
	});

	$('#addToMealBtn').click(function() {
       window.location = "index.html?add=" + encodeURIComponent(1);
    });

	$('#backBtn').click(function(){
		window.history.back();
	});

	$('#nextBtn').click(function(){
		$("#basket-modal").css("display", "block");
	});

	$(document).on("click", "#basket-icon", function(){
		$("#basket-modal").css("display", "block");
	});

	$(document).on("click", ".close", function(){
		$("#basket-modal").css("display", "none");
	});

	$(document).on("click", "#basket-modal", function(evt){
		evt.stopPropagation();
		var modal = document.getElementById("basket-modal");
		if(evt.target.id == "basket-modal"){
			$("#basket-modal").css("display", "none");
		}
	});

	$(document).on("click", ".add-button", function(evt){
		if(basket.length ==0)
		{
			$("#basket-results").html('');
		}
		basket.push(evt.target.value);
		var newItemHtml = generate_basket_html(evt.target.value);
		$("#basket-results").append(newItemHtml);
		$(this).prop('disabled', true);
		$(this).html('      Added       ');
	});

	$(document).on("click", ".remove-button", function(evt){
		// Remove from basket array
		var index = basket.indexOf(evt.target.value);
		if(index != -1) {
			basket.splice(index, 1);
		}
		// Remove from Modal
		$(this).parent().parent().remove();
	});

	$(document).on('click', function(evt) {
	if (evt.target.id.startsWith('food')||(evt.target.id.startsWith('gram'))){
		num = evt.target.id.substring(4)
		if ($('li.lf'+num).hasClass('active')){
			$('li.lf'+num).removeClass('active')
		} else {
			$('li.lf'+num).addClass('active')
			var value = $("#"+evt.target.id).text()
			basket.push(value);
			var newItemHtml = generate_basket_html(value);
			$("#basket-results").append(newItemHtml);

		}
	}
});


});
