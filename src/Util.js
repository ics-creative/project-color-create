var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Util = (function (_super) {
    __extends(Util, _super);
    function Util() {
        _super.apply(this, arguments);

    }
    Util.addText = function addText(parent, font, color, xx, yy, text) {
        var tf = new createjs.Text();
        tf.font = font;
        tf.color = color;
        parent.addChild(tf);
        tf.x = xx;
        tf.y = yy;
        tf.text = text;
        return tf;
    };
    Util.getRectShape = function getRectShape(w, h, color, alpha) {
        var s = new createjs.Shape();
        s.graphics.beginFill(color);
        s.graphics.drawRect(0, 0, w, h);
        s.graphics.endFill();
        s.alpha = alpha;
        return s;
    };
    Util.getRoundRectShape = function getRoundRectShape(w, h, r, color, alpha) {
        var s = new createjs.Shape();
        s.graphics.beginFill(color);
        s.graphics.drawRoundRect(0, 0, w, h, r);
        s.graphics.endFill();
        s.alpha = alpha;
        return s;
    };
    return Util;
})(createjs.Container);
//@ sourceMappingURL=Util.js.map
