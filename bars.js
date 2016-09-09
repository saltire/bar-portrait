'use strict';

var rows = 20;
var columns = 20;
var curviness = 0.5;
var barHeight = 0.8;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.fillStyle = 'black';

var image = new Image();
image.src = './cube.png';
image.onload = function () {
    var imgCanvas = document.createElement('canvas');
    imgCanvas.width = canvas.width;
    imgCanvas.height = canvas.height;
    var imgCtx = imgCanvas.getContext('2d');
    var ratio = Math.min(canvas.width / image.width, canvas.height / image.height);
    imgCtx.scale(ratio, ratio);
    imgCtx.drawImage(image, 0, 0);

    var data = imgCtx.getImageData(0, 0, canvas.width, canvas.height).data;

    var xSpacing = (canvas.width - 1) / columns;
    var ySpacing = (canvas.height - 1) / rows;
    var cpLength = curviness * xSpacing;
    var maxHeight = barHeight * ySpacing;

    for (var y = 0; y < canvas.height; y += ySpacing) {
        var baseline = y + ySpacing - 1;
        var lastHeight = baseline;

        ctx.beginPath();
        ctx.moveTo(0, baseline);

        for (var x = 0; x <= canvas.width; x += xSpacing) {
            var p = (Math.round(y + ySpacing / 2) * canvas.width + Math.round(x)) * 4;
            var r = data[p];
            var g = data[p + 1];
            var b = data[p + 2];
            var v = (r + r + g + g + g + b) / 6;

            var height = baseline - (255 - v) / 255 * maxHeight;

            if (x === 0) {
                ctx.lineTo(x, height);
            } else {
                ctx.bezierCurveTo(x - xSpacing + cpLength, lastHeight, x - cpLength, height, x, height);
            }

            if (x === canvas.width - 1) {
                ctx.lineTo(x, baseline);
            }

            lastHeight = height;
        }

        ctx.closePath();
        ctx.fill();
    }
};