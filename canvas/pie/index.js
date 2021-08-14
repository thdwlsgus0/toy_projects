(function(){
	
	const canvasData = [
		{'canvasColor': '#00ff00', "startAngle": 0, "endAngle": 50, "index": 1, "text": "pizza", "textX": "125", "textY": "80"},
		{'canvasColor': '#ff0000', "startAngle": 50, "endAngle": 150, "index": 2, "text": "hamburger", "textX": "-120", "textY": "130"},
		{'canvasColor': '#0000ff', "startAngle": 150, "endAngle": 250, "index": 3, "text": "chicken", "textX": "-150", "textY": "-100"},
		{'canvasColor': '#000', "startAngle": 250, "endAngle": 360, "index": 4, "text": "soup", "textX": "100", "textY": "-120"},
	];
	const canvas = document.querySelector('#canvas');

	canvas.width = 300;
	canvas.height = 300;
	const centerX = canvas.width/2;
	const centerY = canvas.height/2;

	const context = canvas.getContext('2d');

	canvasData.forEach((value, index, array) => {
		drawPie(value.canvasColor, value.startAngle, value.endAngle, value.index, value.text, +value.textX, +value.textY);
	})

	function drawPie(color, startAngle, endAngle, index, text, textX, textY) {
		context.fillStyle = color;
		context.beginPath();
		context.moveTo(centerX, centerY);
		context.arc(centerX, centerY, centerY - 10, startAngle * Math.PI/180, endAngle * Math.PI/180, false);
		addBrowserText(text, ((endAngle - startAngle) / 360).toFixed(2), color, centerX + textX, centerY + textY);
		context.closePath();
		context.fill();
	}

	function addBrowserText(strText, strRate, color, textX, textY) {
		context.textAlign = "left";
		context.fillStyle = color;
		context.fillText(strText, textX, textY);
		context.fillText(strRate, textX, textY + 20);
	}
})();