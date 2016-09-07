window.onload=function(){
	var canvas=document.getElementById("imgDemo");
	var ctx=null;
	var filterData=[];
	if(canvas.getContext){
		ctx=canvas.getContext("2d");
	}else{
		return;
	}
	var img=new Image();
	var canvasW=canvas.width;
	var canvasH=canvas.height;
	var canvasImageW=118;
	var canvasImageH=118;
	var rows=59,
		cells=59;
	img.crossOrigin="anonymous";
	img.src="source/img1.jpg";
	img.onload=function(){
		var s_width=parseInt(canvasImageW/cells);
		var s_height=parseInt(canvasImageH/rows);
		ctx.drawImage(img,10,10,118,118,0,0,canvasImageW,canvasImageH);
		var imgData=ctx.getImageData(0,0,canvasW,canvasH);
		var imgDataArr=imgData.data;
		for(var i=1;i<=rows;i++){
			for(var j=1;j<=cells;j++){
				pointR=((i*s_height)*canvasW+(j*s_width))*4
				if(imgDataArr[pointR]<253||imgDataArr[pointR+1]<253||imgDataArr[pointR+2]<253){
					filterData.push({
						// x:j*s_width+(Math.random()-0.5)*10,
						// y:i*s_height+(Math.random()-0.5)*10,
						x:j*s_width,
						y:i*s_height,
						fillStyle:"rgb("+imgDataArr[pointR]+","+imgDataArr[pointR+1]+","+imgDataArr[pointR+2]+")"
					})
				}
			}
		}
		draw();
		console.log(imgData);
		console.log(filterData);
	}

	function draw(){
		ctx.clearRect(0,0,canvasW,canvasH);
		for(var i=0;i<filterData.length;i++){
			ctx.fillStyle=filterData[i].fillStyle;
			ctx.fillRect(filterData[i].x,filterData[i].y,1,1);
		}
	}
}