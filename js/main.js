

/* Javascript by Chenxiao (Atlas) Guo, 2019 */

//initialize function called when the script loads
function initialize()
{
	cities();
	jQueryAjax(); // Lesson Activities
	debugAjax(); // On Your Own
};

//function to create a table with cities and their populations
function cities()
{
	//define two arrays for cities and population
	var cityPop = [{
			city: 'Madison, WI',
			population: 255214
		},
		{
			city: 'Milwaukee, WI',
			population: 595351,
		},
		{
			city: 'Chicago, IL',
			population: 2716450
		},
		{
			city: 'Atlanta, GA',
			population: 486290
		},
		{
			city: 'Athens, GA',
			population: 127064
		}
	];

	//append the table element to the div
	$("#mydiv").append("<table>");

	//append a header row to the table
	$("table").append("<tr>");

	//add the "City" and "Population" columns to the header row
	$("tr").append("<th>City</th><th>Population</th>");

	//loop to add a new row for each city
	for (var i = 0; i < cityPop.length; i++) {
		//assign longer html strings to a variable
		var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
		//add the row's html string to the table
		$("table").append(rowHtml);
	};

	addColumns(cityPop);
	addEvents();
};

// add a new coloumn of city size
function addColumns(cityPop)
{

	$('tr').each(function (i)
	{
		//add header
		if (i == 0) {
			$(this).append('<th>City Size</th>');
		} else
		{
			var citySize;
			if (cityPop[i - 1].population < 100000) {
				citySize = 'Small';
			} else if (cityPop[i - 1].population < 500000) {
				citySize = 'Medium';
			} else {
				citySize = 'Large';
			};
			// append the citySize at the end of row
			$(this).append('<td>' + citySize + '</td>');
		};
	});
};

// add the click and mouseover event
function addEvents()
{
	// listen the mouseover event
	$('table').mouseover(function ()
	{
		var color = "rgb(";
		// generate random value for each band
		for (var i = 0; i < 3; i++) {
			// generate randome number from 0 to 25
			var random = Math.round(Math.random() * 255);
			color += random;
			// generate the rgb string
			if (i < 2) {
				color += ",";
			} else {
				color += ")";
			};
			// apply the color
			$(this).css('color', color);
		}
	});

function clickme()
	{
		alert('Hey, you clicked me!');
	};

	// listen the click event
	$('table').on('click', clickme);
};

//define AJAX function
function jQueryAjax(){
    //basic jQuery ajax method
    $.getJSON("data/MegaCities.geojson", callback);
};

// The Ajax function after debug
function debugAjax()
{
	$.ajax("data/MegaCities.geojson", {
		dataType: "json",
		success: debugCallback // after success, simply call the callback function
	});
};

//define callback function
function callback(response, status, jqXHRobject){
    //tasks using the data go here
    console.log(response);
};

// the callback function after debug
function debugCallback(response){
	// append the response in string type after the <br> element
	$(mydiv).append('<br>GeoJSON data:</br>' + JSON.stringify(response));
};

//call the initialize function when the document has loaded
$(document).ready(initialize);
