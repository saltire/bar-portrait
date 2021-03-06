'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BarPortrait = function () {
    function BarPortrait(canvasId, imagePath, rows, columns, curviness, barHeight) {
        _classCallCheck(this, BarPortrait);

        // Create main canvas.
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        // Create image canvas.
        this.imgCanvas = document.createElement('canvas');
        this.imgCanvas.width = this.canvas.width;
        this.imgCanvas.height = this.canvas.height;
        this.imgCtx = this.imgCanvas.getContext('2d');

        // Initialize variables.
        this.rows = Number(rows);
        this.columns = Number(columns);
        this.curviness = Number(curviness);
        this.barHeight = Number(barHeight);

        this.setImage(imagePath);
    }

    _createClass(BarPortrait, [{
        key: 'setImage',
        value: function setImage(imagePath) {
            var _this = this;

            var image = new Image();
            image.src = imagePath;
            image.onload = function () {
                var ratio = Math.min(_this.canvas.width / image.width, _this.canvas.height / image.height);
                _this.imgCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
                _this.imgCtx.drawImage(image, 0, 0);
                _this.data = _this.imgCtx.getImageData(0, 0, _this.canvas.width, _this.canvas.height).data;

                _this.draw();
            };
        }
    }, {
        key: 'setRows',
        value: function setRows(rows) {
            this.rows = Number(rows);
            this.draw();
        }
    }, {
        key: 'setColumns',
        value: function setColumns(columns) {
            this.columns = Number(columns);
            this.draw();
        }
    }, {
        key: 'setCurviness',
        value: function setCurviness(curviness) {
            this.curviness = Number(curviness);
            this.draw();
        }
    }, {
        key: 'setBarHeight',
        value: function setBarHeight(barHeight) {
            this.barHeight = Number(barHeight);
            this.draw();
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = 'black';

            var xSpacing = (this.canvas.width - 1) / (this.columns + 1);
            var ySpacing = (this.canvas.height - 1) / this.rows;
            var cpLength = this.curviness * xSpacing;
            var maxHeight = this.barHeight * ySpacing;

            for (var y = 0; y < canvas.height; y += ySpacing) {
                var baseline = y + ySpacing - 1;
                var lastHeight = baseline;

                this.ctx.beginPath();
                this.ctx.moveTo(0, baseline);

                var x = void 0;
                for (x = 0; x <= this.canvas.width; x += xSpacing) {
                    var value = this.getAverageValue(Math.max(0, Math.ceil(x - xSpacing / 2)), Math.max(0, Math.ceil(y)), Math.min(this.canvas.height - 1, Math.floor(x + xSpacing / 2)), Math.min(this.canvas.width - 1, Math.floor(y + ySpacing - 1)));

                    var height = baseline - (255 - value) / 255 * maxHeight;

                    if (x === 0) {
                        this.ctx.lineTo(x, height);
                    } else {
                        this.ctx.bezierCurveTo(x - xSpacing + cpLength, lastHeight, x - cpLength, height, x, height);
                    }

                    lastHeight = height;
                }

                this.ctx.lineTo(x, baseline);
                this.ctx.closePath();
                this.ctx.fill();
            }
        }
    }, {
        key: 'getAverageValue',
        value: function getAverageValue(left, top, right, bottom) {
            var values = [];

            var width = right - left + 1;
            var height = bottom - top + 1;
            for (var y = top; y <= bottom; y++) {
                for (var x = left; x <= right; x++) {
                    var p = (y * this.canvas.width + x) * 4;
                    var r = this.data[p];
                    var g = this.data[p + 1];
                    var b = this.data[p + 2];
                    values.push((r + r + g + g + g + b) / 6);
                }
            }

            return values.reduce(function (sum, val) {
                return sum + val;
            }) / values.length;
        }
    }]);

    return BarPortrait;
}();