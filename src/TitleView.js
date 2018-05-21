var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TitleView = (function (_super) {
    __extends(TitleView, _super);
    function TitleView($sceneId) {
        _super.call(this, $sceneId);
    }
    TitleView.prototype.init = function () {
        var _this = this;
        this.canvas = document.getElementById("canv");
        this.btnShape = Util.getRoundRectShape(187, 35, 5, "#FFFFFF", 1);
        this.addChild(this.btnShape);
        this.btnShape.x = (Main.STAGE_WIDTH >> 1) - 93;
        this.btnShape.y = 495 - 133;
        this.btnShape.addEventListener("click", function () {
            _this.dispatchEvent("start", _this);
        });
        this.btnShape.addEventListener("mousedown", function (event) {
            createjs.Tween.get(_this.btnShape, {
                override: true
            }).to({
                alpha: 0.5
            }, 250, createjs.Ease.cubicOut);
            event.addEventListener("mouseup", function () {
                createjs.Tween.get(_this.btnShape, {
                    override: true
                }).to({
                    alpha: 1.0
                }, 250, createjs.Ease.cubicOut);
                event.removeAllEventListeners("mouseup");
            });
        });
        Util.addText(this, "48px " + Main.FONT_NAME, "#FFFFFF", Main.STAGE_WIDTH >> 1, 294 - 133, "Color Create").textAlign = "center";
        Util.addText(this, "18px " + Main.FONT_NAME, "#FFFFFF", Main.STAGE_WIDTH >> 1, 361 - 133, "powered by ICS INC.").textAlign = "center";
        Util.addText(this, "24px " + Main.FONT_NAME, "#000000", Main.STAGE_WIDTH >> 1, 498 - 133, "Start").textAlign = "center";
    };
    TitleView.prototype.dispose = function () {
        this.btnShape.removeAllEventListeners("click");
        this.btnShape.removeAllEventListeners("mousedown");
        this.btnShape = null;
        this.removeAllChildren();
        this.removeAllChildren();
    };
    return TitleView;
})(View);
//@ sourceMappingURL=TitleView.js.map
