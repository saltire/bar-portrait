'use strict';

var BarPortrait = function BarPortrait(canvasId, imagePath, rows, columns, curviness, barHeight) {
    // Create main canvas.
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    // Create image canvas.
    this.imgCanvas = document.createElement('canvas');
    this.imgCanvas.width = this.canvas.width;
    this.imgCanvas.height = this.canvas.height;
    this.imgCtx = this.imgCanvas.getContext('2d');

    // Initialize variables.
    this.rows = rows;
    this.columns = columns;
    this.curviness = curviness;
    this.barHeight = barHeight;

    this.setImage(imagePath);
};

BarPortrait.prototype.setImage = function (imagePath) {
    var _this = this;

    var image = new Image();
    image.src = imagePath;
    image.onload = function () {
        var ratio = Math.min(_this.canvas.width / image.width, _this.canvas.height / image.height);
        _this.imgCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
        _this.imgCtx.drawImage(image, 0, 0);

        _this.draw();
    };
};

BarPortrait.prototype.draw = function () {
    this.ctx.fillStyle = 'black';

    var data = this.imgCtx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;

    var xSpacing = (this.canvas.width - 1) / this.columns;
    var ySpacing = (this.canvas.height - 1) / this.rows;
    var cpLength = this.curviness * xSpacing;
    var maxHeight = this.barHeight * ySpacing;

    for (var y = 0; y < canvas.height; y += ySpacing) {
        var baseline = y + ySpacing - 1;
        var lastHeight = baseline;

        this.ctx.beginPath();
        this.ctx.moveTo(0, baseline);

        for (var x = 0; x <= this.canvas.width; x += xSpacing) {
            var p = (Math.round(y + ySpacing / 2) * this.canvas.width + Math.round(x)) * 4;
            var r = data[p];
            var g = data[p + 1];
            var b = data[p + 2];
            var v = (r + r + g + g + g + b) / 6;

            var height = baseline - (255 - v) / 255 * maxHeight;

            if (x === 0) {
                this.ctx.lineTo(x, height);
            } else {
                this.ctx.bezierCurveTo(x - xSpacing + cpLength, lastHeight, x - cpLength, height, x, height);
            }

            if (x === canvas.width - 1) {
                this.ctx.lineTo(x, baseline);
            }

            lastHeight = height;
        }

        this.ctx.closePath();
        this.ctx.fill();
    }
};

new BarPortrait('canvas', 'cube.png', 20, 20, 0.5, 0.8);