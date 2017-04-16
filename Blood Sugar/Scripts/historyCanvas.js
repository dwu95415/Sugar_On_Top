var historyGraph = function () {
    var ctx;
    var margin = { top: 40, left: 75, right: 0, bottom: 75 };
    var height, width, yMax, xMax, data;
    var maxYValue = 500;
    var ratio = 1;
    var renderType = { lines: 'lines', points: 'points' };

    var create = function(canvasId, dataObj) {
        data = dataObj;
        var canvas = document.getElementById(canvasId);
        height = $("#canvas").height();
        width = $("#canvas").width();
        xMax = width - (margin.left + margin.right);
        yMax = height - (margin.top + margin.bottom);
        //ratio = yMax / maxYValue;

        ctx = canvas.getContext("2d");
        createGraph();
    };

    var createGraph = function () {
        renderText();
        createLabels();

        //render data based upon type of renderType(s) that client supplies
        if (data.renderTypes == undefined || data.renderTypes == null) data.renderTypes = [renderType.lines];
        for (var i = 0; i < data.renderTypes.length; i++) {
            drawData(data.renderTypes[i]);
        }
    };

    $(document).on('mousemove', '#canvas', function(evt){
        var x = evt.pageX - $("canvas").offset().left;
        var y = evt.pageY - $("#canvas").offset().top;

    });

    /*var getMaxY = function () {
        for (var i = 0; i < data.dataPoints.length; i++) {
            if (data.dataPoints[i].y > maxYValue){
                maxYValue = data.dataPoints[i].y;
            }
        }
    };*/

    var renderText = function() {
        var labelFont = (data.labelFont != null) ? data.labelFont : '20pt Arial';
        ctx.font = labelFont;
        ctx.textAlign = "center";

        //Title
        var txtSize = ctx.measureText(data.title);
        ctx.fillText(data.title, (width / 2), (margin.top / 2));

        //X-axis text
        txtSize = ctx.measureText(data.xLabel);
        ctx.fillText(data.xLabel, margin.left + (xMax / 2) - (txtSize.width / 2), yMax + (margin.bottom / 1.2));
      
        //Y-axis text
        ctx.save();
        ctx.rotate(-Math.PI / 2);
        ctx.font = labelFont;
        ctx.fillText(data.yLabel, (yMax / 2) * -1, margin.left / 4);
        ctx.restore();
    };

    var createLabels = function () {
        //Vertical guide lines
        var yInc = 50;
        var yPos = 0;
        var yLabelInc = 25;
        var xInc = 50;
        var xPos = margin.left;
        ymax = 500;
        for (var i = 0; i < 10; i++) {
            yPos += (i == 0) ? 0 : yInc;

            //y axis labels
            ctx.font = (data.dataPointFont != null) ? data.dataPointFont : '10pt Calibri';
            var txt = Math.round(maxYValue - ((i == 0) ? 0 : yPos / ratio));
            console.log(txt);
            var txtSize = ctx.measureText(txt);
            ctx.fillText(txt, margin.left - ((txtSize.width >= 14) ? txtSize.width : 10) - 7, yPos);

            //x axis labels
            txt = data.dataPoints[i].x;
            txtSize = ctx.measureText(txt);
            ctx.fillText(txt, xPos, ymax + (margin.bottom / 3));
            xPos += xInc;
        }

        //Vertical line
        drawLine(margin.left, margin.top, margin.left, yMax, 'black');

        //Horizontal Line
        drawLine(margin.left, yMax + 15, xMax, yMax + 15, 'black');
    };

    var drawData = function(type) {
        var xInc = getXInc();
        var prevX = 0, 
            prevY = 0;

        for (var i = 0; i < data.dataPoints.length; i++) {
            var pt = data.dataPoints[i];
            var ptY = (maxYValue - pt.y) * ratio;
            if (ptY < margin.top) ptY = margin.top;
            var ptX = (i * xInc) + margin.left;

            if (i > 0 && type == renderType.lines) {
                //Draw connecting lines
                drawLine(ptX, ptY, prevX, prevY, 'black', 2);
            }

            if (type == renderType.points) {
                var radgrad = ctx.createRadialGradient(ptX, ptY, 8, ptX - 5, ptY - 5, 0);
                radgrad.addColorStop(0.9, 'Black');
                ctx.beginPath();
                ctx.fillStyle = radgrad;
                //Render circle
                ctx.arc(ptX, ptY, 4, 0, 2 * Math.PI, false)
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#000';
                ctx.stroke();
                ctx.closePath();
            }

            prevX = ptX;
            prevY = ptY;
        }
    };

    var getXInc = function() {
        return Math.round(xMax / data.dataPoints.length) - 1;
    };

    var drawLine = function(startX, startY, endX, endY, strokeStyle, lineWidth) {
        if (strokeStyle != null) ctx.strokeStyle = strokeStyle;
        if (lineWidth != null) ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.closePath();
    };

    return {
        renderType: renderType,
        create: create
    };

    
} ();
