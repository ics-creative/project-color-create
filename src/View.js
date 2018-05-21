var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var View = (function (_super) {
    __extends(View, _super);
    function View($sceneId) {
        _super.call(this);
        this.showTime = 300;
        this.hideTime = 300;
        this.sceneId = $sceneId;
    }
    View.prototype.addToStage = function ($stage) {
        this.stage = $stage;
        this.stage.addChild(this);
    };
    View.prototype.init = function () {
    };
    View.prototype.show = function () {
        this.alpha = 0.0;
        createjs.Tween.get(this).to({
            alpha: 1.0
        }, this.showTime, createjs.Ease.getPowOut(2));
        this.visible = true;
    };
    View.prototype.hide = function () {
        this.alpha = 1.0;
        createjs.Tween.get(this).to({
            alpha: 0.0
        }, this.showTime, createjs.Ease.getPowOut(2)).set({
            visible: false
        });
        this.visible = true;
    };
    View.prototype.dispose = function () {
    };
    return View;
})(createjs.Container);
//@ sourceMappingURL=View.js.map
