<html lang="en">
<head>
    <title>Risk Game</title>
</head>
<body>
    <canvas id="fl_canvas" width="1100" height="700"></canvas>
    <script type="text/javascript" src="floodfill.min.js"></script>
	<script type="text/javascript">
        
	<!--
	
	WPADDING = 80;
	HPADDING = 76;
        canvas = document.getElementById("fl_canvas");
	context = canvas.getContext("2d");

        mapImage = new Image();
	mapImage.width = 1020;
	mapImage.height = 624;

	mapImage.onload = function() {
		clearMap();		// redraw blank map
		fillMap([255,0,0,0.5],	// Use red, semi-transparent
			[50,75,30]);	// at 50x, 75y, tolerance of 30
	}
	
	mapImage.src = "riskmap.jpg";
	
	function clearMap() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(mapImage, 0, 0);
	}
	
	function fillMap(rgba, xyt) {
		context.fillStyle = "rgba(" + 
				     rgba[0] + "," + 
				     rgba[1] + "," +
				     rgba[2] + "," +
				     rgba[3] + ")";
				     
		context.fillFlood(xyt[0], xyt[1], xyt[2]);	
	}
	
	function getMousePos(canvas, evt) {
	    var rect = canvas.getBoundingClientRect();
	    return {
	      x: evt.clientX - rect.left,
	      y: evt.clientY - rect.top
	      };
	}

        -->
    </script>
    
</body>
</html>
