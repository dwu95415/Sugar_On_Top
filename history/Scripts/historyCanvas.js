// var historyGraph = function () {
//     var ctx;
//     var margin = { top: 40, left: 75, right: 0, bottom: 75 };
//     var height, width, yMax, xMax, data;
//     var maxYValue = 500;
//     var ratio = 1;
//     var renderType = { lines: 'lines', points: 'points' };
//
//     var create = function(canvasId, dataObj) {
//         data = dataObj;
//         var canvas = document.getElementById(canvasId);
//         height = $("#canvas").height();
//         width = $("#canvas").width();
//         xMax = width - (margin.left + margin.right);
//         yMax = height - (margin.top + margin.bottom);
//         //ratio = yMax / maxYValue;
//
//         ctx = canvas.getContext("2d");
//         createGraph();
//     };
//
//
//     var createGraph = function() {
//         renderText();
//         createLabels();
//     };
//
//     var traceFigure = function(canvasID, meal, dataObj){
//
//         var figureData = dataObj;
//         var dataPoints = meal.dataPoints;
//         //render data based upon type of renderType(s) that client supplies
//         if (figureData.renderTypes == undefined || figureData.renderTypes == null) figureData.renderTypes = [renderType.lines];
//         for (var i = 0; i < figureData.renderTypes.length; i++) {
//             drawData(figureData.renderTypes[i],dataPoints,canvasID);
//         }
//     };
//
//     /*$(document).on('mousemove', '#canvas', function(evt){
//         var x = evt.pageX - $("canvas").offset().left;
//         var y = evt.pageY - $("#canvas").offset().top;
//
//     });*/
//
//     /*var getMaxY = function () {
//         for (var i = 0; i < data.dataPoints.length; i++) {
//             if (data.dataPoints[i].y > maxYValue){
//                 maxYValue = data.dataPoints[i].y;
//             }
//         }
//     };*/
//
//     var renderText = function() {
//         var labelFont = (data.labelFont != null) ? data.labelFont : '20pt Arial';
//         ctx.font = labelFont;
//         ctx.textAlign = "center";
//
//         //Title
//         var txtSize = ctx.measureText(data.title);
//         ctx.fillText(data.title, (width / 2), (margin.top / 2));
//
//         //X-axis text
//         txtSize = ctx.measureText(data.xLabel);
//         ctx.fillText(data.xLabel, margin.left + (xMax / 2) - (txtSize.width / 2), yMax + (margin.bottom / 1.2));
//
//         //Y-axis text
//         ctx.save();
//         ctx.rotate(-Math.PI / 2);
//         ctx.font = labelFont;
//         ctx.fillText(data.yLabel, (yMax / 2) * -1, margin.left / 4);
//         ctx.restore();
//     };
//
//     var getDates = function(){
//         var dates = [];
//         for (var i = 0; i < 15; i++){
//             dates[i] = getDate(i);
//         }
//
//         return dates;
//     };
//
//     var getDate = function(index){
//         var today = new Date();
//         today.setDate(today.getDate() - index);
//         var dd = today.getDate();
//         var mm = today.getMonth()+1; //January is 0!
//
//         if(dd<10) {
//             dd='0'+dd
//         }
//
//         if(mm<10) {
//             mm='0'+mm
//         }
//
//             today = mm+'/'+dd
//         return today;
//     };
//
//     var createLabels = function () {
//         //Vertical guide lines
//         var yInc = 50;
//         var yPos = 0;
//         var yLabelInc = 25;
//         var xInc = 50;
//         var xPos = margin.left;
//         ymax = 500;
//         dates = getDates();
//         for (var i = 0; i < 10; i++) {
//             yPos += (i == 0) ? 0 : yInc;
//
//             //y axis labels
//             ctx.font = (data.dataPointFont != null) ? data.dataPointFont : '10pt Calibri';
//             var txt = Math.round(maxYValue - ((i == 0) ? 0 : yPos / ratio));
//             var txtSize = ctx.measureText(txt);
//             ctx.fillText(txt, margin.left - ((txtSize.width >= 14) ? txtSize.width : 10) - 7, yPos);
//
//             //x axis labels
//             txt = dates[i];
//             txtSize = ctx.measureText(txt);
//             ctx.fillText(txt, xPos, ymax + (margin.bottom / 3));
//             xPos += xInc;
//         }
//
//         //Vertical line
//         drawLine(margin.left, margin.top, margin.left, yMax, 'black');
//
//         //Horizontal Line
//         drawLine(margin.left, yMax + 15, xMax, yMax + 15, 'black');
//     };
//
//     var drawData = function(type, dataPoints, canvasID) {
//         var xInc = getXInc();
//         var prevX = 0,
//             prevY = 0;
//
//         for (var i = 0; i < 15; i++) {
//             var pt = dataPoints[i];
//             var ptY = (maxYValue - pt.y) * ratio;
//             if (ptY < margin.top) ptY = margin.top;
//             var ptX = (i * xInc) + margin.left;
//
//             if (i > 0 && type == renderType.lines) {
//                 //Draw connecting lines
//                 var color;
//                 if (canvasID == "breakfast")
//                     color = "red";
//                 if (canvasID == "lunch")
//                     color = "blue";
//                 if (canvasID == "dinner")
//                     color = "green";
//
//                 drawLine(ptX, ptY, prevX, prevY, color, 2);
//             }
//
//             if (type == renderType.points) {
//                 var radgrad = ctx.createRadialGradient(ptX, ptY, 8, ptX - 5, ptY - 5, 0);
//                 radgrad.addColorStop(0.9, 'Black');
//                 ctx.beginPath();
//                 ctx.fillStyle = radgrad;
//                 //Render circle
//                 ctx.arc(ptX, ptY, 4, 0, 2 * Math.PI, false)
//                 ctx.fill();
//                 ctx.lineWidth = 1;
//                 ctx.strokeStyle = '#000';
//                 ctx.stroke();
//                 ctx.closePath();
//             }
//
//             prevX = ptX;
//             prevY = ptY;
//         }
//     };
//
//     var getXInc = function() {
//         return Math.round(xMax / 15) - 1;
//     };
//
//     var drawLine = function(startX, startY, endX, endY, strokeStyle, lineWidth) {
//         if (strokeStyle != null) ctx.strokeStyle = strokeStyle;
//         if (lineWidth != null) ctx.lineWidth = lineWidth;
//         ctx.beginPath();
//         ctx.moveTo(startX, startY);
//         ctx.lineTo(endX, endY);
//         ctx.stroke();
//         ctx.closePath();
//     };
//
//     return {
//         renderType: renderType,
//         create: create,
//         traceFigure: traceFigure
//     };
//
//
// } ();
//
// $(document).on('click','#save',function(){
//     window.location = "../index.html";
//
// });
//
// $(function () {
//     var data = {
//     labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
//     datasets: [
//         {
//             label: "Breakfast",
//             fillColor: "rgba(52, 152, 219,0)",
//             strokeColor: "rgba(52, 152, 219,1.0)",
//             pointColor: "rgba(52, 152, 219,1.0)",
//             pointStrokeColor: "#fff",
//             pointHighlightFill: "#fff",
//             pointHighlightStroke: "rgba(52, 152, 219,1.0)",
//             borderWidth: 10,
//             data: [108,124,176,130,98,70,80]
//         },
//         {
//             label: "Lunch",
//             fillColor: "rgba(231, 76, 60,0)",
//             strokeColor: "rgba(231, 76, 60,1.0)",
//             pointColor: "rgba(231, 76, 60,1.0)",
//             pointStrokeColor: "#fff",
//             pointHighlightFill: "#fff",
//             pointHighlightStroke: "rgba(231, 76, 60,1.0)",
//             borderWidth: 10,
//             data: [97,76,65,215,124,190,134]
//         },
//         {
//             label: "Dinner",
//             fillColor: "rgba(46, 204, 113,0)",
//             strokeColor: "rgba(46, 204, 113,1.0)",
//             pointColor: "rgba(46, 204, 113,1.0)",
//             pointStrokeColor: "#fff",
//             pointHighlightFill: "#fff",
//             pointHighlightStroke: "rgba(46, 204, 113,1.0)",
//             borderWidth: 10,
//             data: [120,90,100,104,130,125,175]
//         }
//
//         ]
//     };
//
//     var option = {
//     responsive: true,
//     maintainAspectRatio: false,
//     elements: {
//       line: {
//         borderWidth: 50
//       }
//     }
//     };
//     //Chart.defaults.global.elements.line.borderWidth = 5;
//
//     console.log("HERE")
//     // Get the context of the canvas element we want to select
//     var ctx = document.getElementById("bsGraph").getContext('2d');
//     var myLineChart = new Chart(ctx).Line(data, option); //'Line' defines type of the chart.
// });

var plot_graph = function(){
var breakfast_data = [//[day, unit]
  [1,123],
  [2,97],
  [3,104],
  [4,110],
  [5,220],
  [6,121],
  [7,100]
];

var lunch_data = [//[day, unit]
  [1,140],
  [2,150],
  [3,147],
  [4,161],
  [5,125],
  [6,63],
  [7,145]
];

var dinner_data = [//[day, unit]
  [1,75],
  [2,103],
  [3,87],
  [4,94],
  [5,101],
  [6,145],
  [7,99]
];
var dataset = [];
var color_order = [];
if($('#breakfast-tog-button').hasClass('tog-active'))
{
  dataset.push({ label: "Breakfast", data: breakfast_data });
  color_order.push("#e74c3c");
}
if($('#lunch-tog-button').hasClass('tog-active'))
{
  dataset.push({ label: "Lunch", data: lunch_data });
  color_order.push("#3498db");
}
if($('#dinner-tog-button').hasClass('tog-active'))
{
  dataset.push({ label: "Dinner", data: dinner_data});
  color_order.push("#2ecc71");
}


var options = {
            series: {
                lines: {
                    show: true,
                    lineWidth: 10
                },
                points: {
                    radius: 10,
                    fill: true,
                    show: true
                }
            },
            xaxis: {
                mode: "time",
                tickSize: [1, "day"],
                tickLength: 0,
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 10
            },
            yaxis: {
            },
            legend: {
              show: false
            },
            grid: {
                hoverable: true,
                borderWidth:0
            },
            colors: color_order
        };

        $.plot($("#flot-placeholder"), dataset, options);
}
        $(document).ready(function () {
            plot_graph();
        });

      $(document).on('click','.toggle-button',function(){
          if($(this).hasClass('tog-active')){
            $(this).removeClass('tog-active');
          } else {
            $(this).addClass('tog-active');
          }
          plot_graph();
      });

      $(document).on('click','#save',function(){
          window.location = "../index.html";

      });

      $(document).on('click','#add-item',function(){
          window.location = "../saved.html";

      });
        // $(document).on('click','#save',function(){
        //     window.location = "index.html";
        //
        // });
