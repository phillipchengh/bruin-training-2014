//display notes as default
$(document).ready(function() {
	display_notes();
});

//displays notes, just to take up space really
function display_notes() {
	$('#d3-content').load("contributions/notes.html");
}

//format money I got from http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
function format_money (string) {
	return "$" + string.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

//display simple table (my personal favorite)
function display_table(data) {
	var lazy_html = "";
	var i;
	lazy_html += "<table class=\"table amazing-table\">";
	lazy_html +="<tr><th>Total</th><th>Garcetti</th><th>Greuel</th>";

	for (j = 0; j < data[0].names.length; j++) {
		lazy_html +="<th>" + data[0].names[j].type + "</th>";
	}
	lazy_html += "</tr>";

	console.log(data.length);		
	console.log(data);
	for (i = 0; i < data.length; i++) {
		lazy_html += "<tr>";
		lazy_html += "<td>" + format_money(data[i].total) + "</td>";			
		lazy_html += "<td>" + format_money(data[i].garcetti) + "</td>";			
		lazy_html += "<td>" + format_money(data[i].greuel) + "</td>";	
		for (j = 0; j < data[i].names.length; j++) {
			lazy_html +="<td>" + data[i].names[j].name + "</td>";
		}					
		lazy_html += "</tr>";

	}
	lazy_html += "</table>"
	$('#d3-content').append(lazy_html);
}

//after submit, query for data and display it!
function display_query() {
	var query_url = "services/query.json?";
	var checked = $('input[type=checkbox].query-box:checked')

	//require at least one checked
	if (checked.length < 1) {
		$("#d3-content").html("<div class=\"alert alert-danger\"><strong>Hold up!</strong> Need to check off at least one!</div>");
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
			// $("#d3-content").empty();
			//opts stolen from spinner site
			var opts = {
			  lines: 13, // The number of lines to draw
			  length: 20, // The length of each line
			  width: 10, // The line thickness
			  radius: 30, // The radius of the inner circle
			  corners: 1, // Corner roundness (0..1)
			  rotate: 0, // The rotation offset
			  direction: 1, // 1: clockwise, -1: counterclockwise
			  color: '#000', // #rgb or #rrggbb or array of colors
			  speed: 1, // Rounds per second
			  trail: 60, // Afterglow percentage
			  shadow: false, // Whether to render a shadow
			  hwaccel: false, // Whether to use hardware acceleration
			  className: 'spinner', // The CSS class to assign to the spinner
			  zIndex: 2e9, // The z-index (defaults to 2000000000)
			  top: 25, // Top position relative to parent in px
			  left: 40 // Left position relative to parent in px
			};
			var target = document.getElementById('spin-zone');
			var spinner = new Spinner(opts).spin(target);
		}
	});

	var x_test = 0;
	//on success, use data to display pretty stuff
	request.done(function(data) {
		//display stuff here
		$('#spin-zone').empty();
		$('#d3-content').html("<button class=\"btn btn-warning\" onClick=\"display_notes()\">Back to Notes</button><br>")
		display_table(data);
	});

	//if it failed
	request.fail(function(jqXHR, textStatus) {
		$("#d3-content").html("<div class=\"alert alert-danger\"><strong>Error!</strong> Something went wrong!</div>");
	});

}
