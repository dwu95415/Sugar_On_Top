var FOOD_DATABASE = ["Chicken", "Beans", "Rice", "Whole Wheat Tortilla", "White Tortilla", "Pork", "Beef"]
var basket = []

var show_search_results = function(food_name){
	$("#search-results").html(''); 
	var hasResult = false;
	for(i=0; i < FOOD_DATABASE.length; i++)
	{
		if(FOOD_DATABASE[i].toLowerCase().indexOf(food_name.toLowerCase())!==-1)
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

var generate_result_html= function(food_name){
	html =
		"<div class='searchResult'>" +
			"<div class='resultName col-md-6'>" + food_name +"</div>" +
			"<div class='resultOptions col-md-2 col-md-push-3'>" +
			"<button class='btn btn-default add-button' type='submit' value='"+food_name+"'>Add to Basket</button></div></div>";

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

});