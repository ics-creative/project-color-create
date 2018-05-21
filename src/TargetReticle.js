var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TargetReticle = (function (_super) {
    __extends(TargetReticle, _super);
    function TargetReticle() {
        _super.call(this);
        this.shape = new createjs.Shape();
        this.addChild(this.shape);
        this.color = new ColorRGB();
    }
    TargetReticle.prototype.drawReticle = function (col, min, c1, c2, max) {
        this.color.setUint(col);
        var g = this.shape.graphics;
        var color = this.color.getRGBString();
        g.clear();
        this.drawStroke(g, color, min);
        this.drawStroke(g, color, c1);
        this.drawStroke(g, color, c2);
        this.drawStroke(g, color, max);
        var cos = [];
        var sin = [];
        var split = 3;
        for(var j = 0; j < split; j++) {
            var theta = -Math.PI / 2 + j * Math.PI * 2 / split;
            cos[j] = Math.cos(theta);
            sin[j] = Math.sin(theta);
        }
        var length = ((max - min + 3) / 6) | 0;
        for(var i = 0; i < length; i++) {
            for(var j = 0; j < split; j++) {
                var dc = 6 * cos[j] * i;
                var ds = 6 * sin[j] * i;
                g.moveTo(min * cos[j] + dc, min * sin[j] + ds);
                g.lineTo(min * cos[j] + 3 * cos[j] + dc, min * sin[j] + 3 * sin[j] + ds);
            }
        }
    };
    TargetReticle.prototype.drawStroke = function (g, col, r) {
        g.beginStroke(col);
        g.drawCircle(0, 0, r);
        g.endFill();
    };
    return TargetReticle;
})(createjs.Container);
//@ sourceMappingURL=TargetReticle.js.map
