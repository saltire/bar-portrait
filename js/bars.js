class BarPortrait {
    constructor(imageId, canvasId, maxSize, imagePath, rows, columns, curviness, barHeight) {
        // Get reference to original image.
        this.image = document.getElementById(imageId);

        // Create main canvas.
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        // Create image canvas.
        this.imgCanvas = document.createElement('canvas');
        this.imgCtx = this.imgCanvas.getContext('2d');

        // Initialize variables.
        this.maxSize = Number(maxSize);
        this.rows = Number(rows);
        this.columns = Number(columns);
        this.curviness = Number(curviness);
        this.barHeight = Number(barHeight);

        this.setImage(imagePath);
    }

    setImage(imagePath) {
        const image = new Image();
        image.src = imagePath;
        image.onload = () => {
            this.image.src = imagePath;
            const maxWidth = Math.min(image.width, this.maxSize);
            const maxHeight = Math.min(image.height, this.maxSize);
            const ratio = Math.min(maxHeight / image.height, maxWidth / image.width);

            const width = Math.floor(image.width * ratio);
            const height = Math.floor(image.height * ratio);

            this.canvas.width = this.imgCanvas.width = this.image.width = width;
            this.canvas.height = this.imgCanvas.height = this.image.height = height;

            this.imgCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
            this.imgCtx.drawImage(image, 0, 0);
            this.data = this.imgCtx.getImageData(0, 0, width, height).data;

            this.draw();
        };
    }

    setImageFromFile(file) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            this.setImage(reader.result);
        });
        reader.readAsDataURL(file);
    }

    setRows(rows) {
        this.rows = Number(rows);
        this.draw();
    }

    setColumns(columns) {
        this.columns = Number(columns);
        this.draw();
    }

    setCurviness(curviness) {
        this.curviness = Number(curviness);
        this.draw();
    }

    setBarHeight(barHeight) {
        this.barHeight = Number(barHeight);
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'black';

        const xSpacing = (this.canvas.width - 1) / (this.columns + 1);
        const ySpacing = (this.canvas.height - 1) / this.rows;
        const cpLength = this.curviness * xSpacing;
        const maxHeight = this.barHeight * ySpacing;

        for (let y = 0; y < this.canvas.height; y += ySpacing) {
            const baseline = y + ySpacing - 1;
            let lastHeight = baseline;

            this.ctx.beginPath();
            this.ctx.moveTo(0, baseline);

            let x;
            for (x = 0; x <= this.canvas.width; x += xSpacing) {
                const value = this.getAverageValue(
                    Math.max(0, Math.round(x - xSpacing / 2)),
                    Math.min(this.canvas.width - 1, Math.round(x + xSpacing / 2)),
                    Math.max(0, Math.round(y)),
                    Math.min(this.canvas.height - 1, Math.round(y + ySpacing - 1))
                );

                const height = baseline - (255 - value) / 255 * maxHeight;

                if (x === 0) {
                    this.ctx.lineTo(x, height);
                }
                else {
                    this.ctx.bezierCurveTo(
                        x - xSpacing + cpLength, lastHeight,
                        x - cpLength, height,
                        x, height);
                }

                lastHeight = height;
            }

            this.ctx.lineTo(x, baseline);
            this.ctx.closePath();
            this.ctx.fill();
        }
    }

    getAverageValue(left, right, top, bottom) {
        const values = [];

        for (let y = top; y <= bottom; y++) {
            for (let x = left; x <= right; x++) {
                const p = (y * this.canvas.width + x) * 4;
                const r = this.data[p];
                const g = this.data[p + 1];
                const b = this.data[p + 2];
                values.push((r + r + g + g + g + b) / 6);
            }
        }

        return values.reduce((sum, val) => sum + val) / values.length;
    }
}
