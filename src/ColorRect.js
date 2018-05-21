var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ColorRect = (function (_super) {
    __extends(ColorRect, _super);
    function ColorRect() {
        _super.call(this);
        this.shape = new createjs.Shape();
        this.addChild(this.shape);
        this.color = new ColorRGB();
        var s = new createjs.Shape();
        this.addChild(s);
        s.graphics.beginStroke("#666666");
        s.graphics.drawCircle(0, 0, 50);
        s.graphics.endFill();
    }
    ColorRect.prototype.drawRect = function (col, r) {
        this.color.setUint(col);
        this.shape.graphics.clear();
        this.shape.graphics.beginFill(this.color.getRGBString());
        this.shape.graphics.drawCircle(0, 0, r);
        this.shape.graphics.endFill();
    };
    return ColorRect;
})(createjs.Container);
//@ sourceMappingURL=ColorRect.js.map
