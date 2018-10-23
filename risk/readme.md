<html lang="en">
<head>
    <title>Risk Game</title>
</head>
<body>
    <canvas id="fl_canvas" width="1100" height="700"></canvas>
    <script type="text/javascript" src="floodfill.min.js"></script>
	<script type="text/javascript">
        
	<!--
	
	WPADDING 	= 80;
	HPADDING 	= 76;
	BLUISH	 	= [0,0,255,0.5];
	REDDISH		= [255,0,0,0.5];
	CLICK_TOLERANCE	= 30;
	STARTING_SPOT 	= [50,75];
        canvas = document.getElementById("fl_canvas");
	context = canvas.getContext("2d");

        mapImage = new Image();
	mapImage.width = 1020;
	mapImage.height = 624;

	mapImage.onload = function() {
		clearMap();		// redraw blank map
		fillMap(BLUISH,		// Use blue, semi-transparent
			STARTING_SPOT);	// at 50x, 75y, tolerance of 30
	}
	
	mapImage.src = "riskmap.jpg";
	
	function clearMap() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(mapImage, 0, 0);
	}
	
	function fillMap(rgba, xy) {
		context.fillStyle = "rgba(" + 
				     rgba[0] + "," + 
				     rgba[1] + "," +
				     rgba[2] + "," +
				     rgba[3] + ")";
				     
		context.fillFlood(xyt[0], xyt[1], CLICK_TOLERANCE);	
	}
	
	// Add event listener for `click` events.
	canvas.addEventListener('click', function(event) {
		fillMap(REDDISH, [event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop]); 
		});
        -->
    </script>
    
</body>
</html>
