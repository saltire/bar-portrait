'use strict';

const rows = 20;
const columns = 20;
const curviness = 0.5;
const barHeight = 0.8;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'black';

const image = new Image();
image.src = './cube.png';
image.onload = () => {
    const imgCanvas = document.createElement('canvas');
    imgCanvas.width = canvas.width;
    imgCanvas.height = canvas.height;
    const imgCtx = imgCanvas.getContext('2d');
    const ratio = Math.min(canvas.width / image.width, canvas.height / image.height);
    imgCtx.scale(ratio, ratio);
    imgCtx.drawImage(image, 0, 0);

    const data = imgCtx.getImageData(0, 0, canvas.width, canvas.height).data;

    const xSpacing = (canvas.width - 1) / columns;
    const ySpacing = (canvas.height - 1) / rows;
    const cpLength = curviness * xSpacing;
    const maxHeight = barHeight * ySpacing;

    for (let y = 0; y < canvas.height; y += ySpacing) {
        const baseline = y + ySpacing - 1;
        let lastHeight = baseline;

        ctx.beginPath();
        ctx.moveTo(0, baseline);

        for (let x = 0; x <= canvas.width; x += xSpacing) {
            const p = (Math.round(y + ySpacing / 2) * canvas.width + Math.round(x)) * 4;
            const r = data[p];
            const g = data[p + 1];
            const b = data[p + 2];
            const v = (r + r + g + g + g + b) / 6;

            const height = baseline - (255 - v) / 255 * maxHeight;

            if (x === 0) {
                ctx.lineTo(x, height);
            }
            else {
                ctx.bezierCurveTo(
                    x - xSpacing + cpLength, lastHeight,
                    x - cpLength, height,
                    x, height);
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
