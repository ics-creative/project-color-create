var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TouchCircle = (function (_super) {
    __extends(TouchCircle, _super);
    function TouchCircle($colorName, $innerSize, $dMax, $dMin, $baseColor) {
        if (typeof $baseColor === "undefined") { $baseColor = 0x0; }
        _super.call(this);
        this.colorName = $colorName;
        this.dMax = $dMax;
        this.dMin = $dMin;
        this.innerSize = $innerSize;
        this.line = new createjs.Shape();
        this.addChild(this.line);
        this.shape = new createjs.Shape();
        this.addChild(this.shape);
        this.shape2 = new createjs.Shape();
        this.addChild(this.shape2);
        this.baseColor = $baseColor;
        this.text = new createjs.Text();
        this.addChild(this.text);
        this.text.font = "40px Arial";
        this.text.color = new ColorRGB($baseColor).getRGBString();
        this.text.y = -150;
        this.color = new ColorRGB();
        this.shape.compositeOperation = "lighter";
        this.shape2.compositeOperation = "lighter";
        this.shape.alpha = 0.2;
    }
    TouchCircle.prototype.init = function ($identifier, $initX, $initY) {
        this.identifier = $identifier;
        this.initX = $initX;
        this.initY = $initY;
        this.x = this.initX;
        this.y = this.initY;
        this.line.graphics.clear();
    };
    TouchCircle.prototype.initDraw = function (col, size) {
        this.line.graphics.clear();
        this.text.text = "";
        this.drawCircle(col, size);
    };
    TouchCircle.prototype.drawCircle = function (col, size) {
        this.color.setUint(col);
        this.shape.graphics.clear();
        this.shape.graphics.beginFill(this.color.getRGBString());
        this.shape.graphics.drawCircle(0, 0, size);
        this.shape.graphics.endFill();
        this.shape2.graphics.clear();
        this.shape2.graphics.beginFill(this.color.getRGBString());
        this.shape2.graphics.drawCircle(0, 0, this.innerSize);
        this.shape2.graphics.endFill();
    };
    TouchCircle.prototype.getDPercent = function (currentX, currentY) {
        var dx = currentX - this.initX;
        var dy = currentY - this.initY;
        var percent = (Math.sqrt(dx * dx + dy * dy) - this.dMin) / (this.dMax - this.dMin);
        percent = percent < 0 ? 0 : percent;
        percent = percent > 1 ? 1 : percent;
        this.dPercent = percent;
        return this.dPercent;
    };
    TouchCircle.prototype.setText = function (xx, yy, value) {
        this.text.x = xx - this.initX;
        this.text.y = yy - this.initY;
        this.text.text = this.colorName + ":" + value;
    };
    TouchCircle.prototype.setData = function (col, size, xx, yy, textValue) {
        this.color.setUint(col);
        this.shape.graphics.clear();
        this.shape.graphics.beginFill(this.color.getRGBString());
        this.shape.graphics.drawCircle(0, 0, size);
        this.shape.graphics.endFill();
        this.shape2.graphics.clear();
        this.shape2.graphics.beginFill(this.color.getRGBString());
        this.shape2.graphics.drawCircle(0, 0, this.innerSize);
        this.shape2.graphics.endFill();
        this.x = xx;
        this.y = yy;
        var line = this.line;
        line.graphics.clear();
        line.graphics.beginStroke(new ColorRGB(this.baseColor).getRGBString());
        line.graphics.moveTo(this.initX - xx, this.initY - yy);
        line.graphics.lineTo(0, 0);
        line.graphics.endStroke();
        line.graphics.beginStroke(new ColorRGB(this.baseColor).getRGBString());
        line.graphics.drawCircle(0, 0, 50);
        line.graphics.endStroke();
    };
    return TouchCircle;
})(createjs.Container);
//@ sourceMappingURL=TouchCircle.js.map
