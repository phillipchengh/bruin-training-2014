$(document).ready(function() {
	// display something at start?
});

//after submit, query for data and display it!
function display_query() {
	var query_url = "services/query.json?";
	var checked = $('input[type=checkbox].query-box:checked')

	//require at least one checked
	if (checked.length < 1) {
		$(".d3-content").html("Need to check off at least one.");
		return;
	}

	//add url parameters
	checked.each(function () {
		query_url += "type=" + $(this).val() + "&";
	});

	//ajax request
	var request = $.ajax({
		url: query_url,
		type: "GET",
		dataType: "json",
		beforeSend: function() {
			$(".d3-content").html("loading...");
		}
	});

	//on success, use data to display pretty stuff
	request.done(function(data) {
		//display stuff here
		$(".d3-content").html(JSON.stringify(data));
	});

	//if it failed
	request.fail(function(jqXHR, textStatus) {
		$(".d3-content").html("Something went wrong with textStatus: " + textStatus);
	});

}
