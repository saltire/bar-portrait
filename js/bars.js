'use strict';

const BarPortrait = function (canvasId, imagePath, rows, columns, curviness, barHeight) {
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
    const image = new Image();
    image.src = imagePath;
    image.onload = () => {
        const ratio = Math.min(this.canvas.width / image.width, this.canvas.height / image.height);
        this.imgCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
        this.imgCtx.drawImage(image, 0, 0);

        this.draw();
    };
};

BarPortrait.prototype.draw = function () {
    this.ctx.fillStyle = 'black';

    const data = this.imgCtx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;

    const xSpacing = (this.canvas.width - 1) / this.columns;
    const ySpacing = (this.canvas.height - 1) / this.rows;
    const cpLength = this.curviness * xSpacing;
    const maxHeight = this.barHeight * ySpacing;

    for (let y = 0; y < canvas.height; y += ySpacing) {
        const baseline = y + ySpacing - 1;
        let lastHeight = baseline;

        this.ctx.beginPath();
        this.ctx.moveTo(0, baseline);

        for (let x = 0; x <= this.canvas.width; x += xSpacing) {
            const p = (Math.round(y + ySpacing / 2) * this.canvas.width + Math.round(x)) * 4;
            const r = data[p];
            const g = data[p + 1];
            const b = data[p + 2];
            const v = (r + r + g + g + g + b) / 6;

            const height = baseline - (255 - v) / 255 * maxHeight;

            if (x === 0) {
                this.ctx.lineTo(x, height);
            }
            else {
                this.ctx.bezierCurveTo(
                    x - xSpacing + cpLength, lastHeight,
                    x - cpLength, height,
                    x, height);
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
