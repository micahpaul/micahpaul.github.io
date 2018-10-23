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
	CLICK_TOLERANCE	= 60;
	STARTING_SPOT 	= [50,75];
        canvas = document.getElementById("fl_canvas");
	context = canvas.getContext("2d");

        mapImage = new Image();
	mapImage.width = 1020;
	mapImage.height = 624;

	mapImage.onload = function() {
		clearMap();
		fillMap(REDDISH, STARTING_SPOT);
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
				     
		context.fillFlood(xy[0], xy[1], CLICK_TOLERANCE);	
	}
	
	// Add event listener for `click` events.
	canvas.addEventListener('click', function(event) {
		var tmpX = event.pageX - canvas.offsetLeft;
		var tmpY = event.pageY - canvas.offsetTop;
		var imgData=context.getImageData(tmpX,tmpY,1,1);
		
		var shouldFill = imgData[0] < 200;
		shouldFill = shouldFill || imgData[1] < 200;
		shouldFill = shouldFill || imgData[2] < 200;
		
		if ( shouldFill ) {
			fillMap( BLUISH, [tmpX, tmpY] );
			}
		});
        -->
    </script>
    
</body>
</html>
