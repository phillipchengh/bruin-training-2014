$(document).ready(function() {
	display_sectors();	
});

function display_sectors() {
	var request = $.ajax({
		url: "services/sectors.json",
		type: "GET",
		dataType: "json"
	});

	request.done(function(data) {
		// $(".d3-content").html(JSON.stringify(data));
		display_sectors_pie_charts(data);
	});

	request.fail(function(jqXHR, textStatus) {
		$(".d3-content").html("Something went wrong with textStatus: " + textStatus);
	});
}

//[{"total":6908679,"garcetti":1111343,"greuel":5797336,"name":"Union"}
function display_sectors_pie_charts(sector_data) {
	$(".d3-content").empty();
	
	var width = 960,
	    height = 500,
	    radius = Math.min(width, height) / 2;
        color = d3.scale.category20b();     //builtin range of colors

	var arc = d3.svg.arc()
	.outerRadius(radius - 10)
	.innerRadius(0);

	var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.garcetti; });

	var svg = d3.select(".d3-content").append("svg")
    .attr("width", width)
    .attr("height", height)
    .data(sector_data)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
  	.data(pie(sector_data))
    .enter().append("g")
	.attr("class", "arc");

  	g.append("path")
  	.attr("fill", function(d, i) { return color(i); } )
  	.attr("d", arc)

  	g.append("text")
    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
    .attr("dy", ".8em")
    .style("text-anchor", "middle")
    .text(function(d) { return d.data.name; });
}

function display_occupations() {
	var request = $.ajax({
		url: "services/occupations.json",
		type: "GET",
		dataType: "json"
	});

	request.done(function(data) {
		$(".d3-content").html(JSON.stringify(data));
	});

	request.fail(function(jqXHR, textStatus) {
		$(".d3-content").html("Something went wrong with textStatus: " + textStatus);
	});
}

