var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ResultView = (function (_super) {
    __extends(ResultView, _super);
    function ResultView($sceneId) {
        _super.call(this, $sceneId);
    }
    ResultView.prototype.tests = function (total, target, result) {
        var s = new ScoreData();
        s.total = total;
        s.target = target;
        s.result = result;
        return s;
    };
    ResultView.prototype.init = function () {
        var _this = this;
        var scoreList = this.manager.datas[0];
        this.canvas = document.getElementById("canv");
        var textResult = Util.addText(this, "36px " + Main.FONT_NAME, "#FFFFFF", 141 - 32, 166 - 133, "Result");
        var str = "";
        var roundTotal = 0;
        var length = scoreList.length;
        var textList = [];
        for(var i = 0; i < length; i++) {
            var score = scoreList[i];
            str += "Round" + (i + 1) + ":" + score.total + "\n";
            roundTotal += score.total;
            textList[i] = Util.addText(this, "24px " + Main.FONT_NAME, "#FFFFFF", 116 - 32, 234 - 133 + i * 32, "Round" + (i + 1) + ":" + score.total);
        }
        var textYour = Util.addText(this, "36px " + Main.FONT_NAME, "#FFFFFF", 112 - 32, 356 - 133, "Your Score");
        this.textTotal = Util.addText(this, "56px " + Main.FONT_NAME, "#FFFFFF", Main.STAGE_WIDTH >> 1, 398 - 133, String(roundTotal));
        this.textTotal.textAlign = "center";
        var con = new createjs.Container();
        this.addChild(con);
        var s = Util.getRoundRectShape(187, 35, 5, "#FFFFFF", 1);
        s.x = -93;
        s.y = -17;
        con.addChild(s);
        Util.addText(con, "24px " + Main.FONT_NAME, "#000000", 0, -14, "Tweet").textAlign = "center";
        this.btnTweet = con;
        this.btnTweet.x = Main.STAGE_WIDTH >> 1;
        this.btnTweet.y = 495 - 133;
        this.btnTweet.addEventListener("click", function () {
            var url = "http://twitter.com/?status=ColorCreate SCORE : " + roundTotal + " %23ColorCreate %23createjsjp";
            window.open(url);
        });
        this.btnTweet.addEventListener("mousedown", function (event) {
            createjs.Tween.get(_this.btnTweet, {
                override: true
            }).to({
                alpha: 0.5
            }, 250, createjs.Ease.cubicOut);
            event.addEventListener("mouseup", function () {
                createjs.Tween.get(_this.btnTweet, {
                    override: true
                }).to({
                    alpha: 1.0
                }, 250, createjs.Ease.cubicOut);
                event.removeAllEventListeners("mouseup");
            });
        });
        con = new createjs.Container();
        this.addChild(con);
        s = Util.getRoundRectShape(187, 35, 5, "#FFFFFF", 1);
        s.x = -93;
        s.y = -17;
        con.addChild(s);
        Util.addText(con, "24px " + Main.FONT_NAME, "#000000", 0, -14, "Retry").textAlign = "center";
        this.btnRetry = con;
        this.btnRetry.x = Main.STAGE_WIDTH >> 1;
        this.btnRetry.y = 545 - 133;
        this.btnRetry.addEventListener("click", function () {
            _this.dispatchEvent("retry", _this);
        });
        this.btnRetry.addEventListener("mousedown", function (event) {
            createjs.Tween.get(_this.btnRetry, {
                override: true
            }).to({
                alpha: 0.5
            }, 250, createjs.Ease.cubicOut);
            event.addEventListener("mouseup", function () {
                createjs.Tween.get(_this.btnRetry, {
                    override: true
                }).to({
                    alpha: 1.0
                }, 250, createjs.Ease.cubicOut);
                event.removeAllEventListeners("mouseup");
            });
        });
        textResult.alpha = 0;
        createjs.Tween.get(textResult).wait(400).to({
            alpha: 1.0
        }, 200, createjs.Ease.getPowOut(2));
        for(var i = 0; i < length; i++) {
            textList[i].alpha = 0;
            createjs.Tween.get(textList[i]).wait(800 + i * 350).to({
                alpha: 1.0
            }, 200, createjs.Ease.getPowOut(2));
        }
        textYour.alpha = 0;
        createjs.Tween.get(textYour).wait(2200).to({
            alpha: 1.0
        }, 300, createjs.Ease.getPowOut(2));
        this.totalScore = 0;
        this.textTotal.alpha = 0;
        createjs.Tween.get(this.textTotal).wait(2800).to({
            alpha: 1.0
        }, 300, createjs.Ease.getPowOut(2));
        createjs.Tween.get(this).wait(2900).set({
            r: 0,
            g: 0,
            b: 0
        }).to({
            totalScore: roundTotal
        }, 400).call(this.onTick).set({
            play: false
        });
        this.btnTweet.scaleX = 0.0;
        this.btnTweet.scaleY = 0.0;
        createjs.Tween.get(this.btnTweet).wait(3600).to({
            scaleX: 1.0,
            scaleY: 1.0
        }, 300, createjs.Ease.getPowOut(5));
        this.btnRetry.scaleX = 0.0;
        this.btnRetry.scaleY = 0.0;
        createjs.Tween.get(this.btnRetry).wait(3600).to({
            scaleX: 1.0,
            scaleY: 1.0
        }, 300, createjs.Ease.getPowOut(5));
        this.play = true;
    };
    ResultView.prototype.onTick = function () {
        if(!this.play) {
            return;
        }
        this.textTotal.text = String(Math.floor(this.totalScore));
    };
    ResultView.prototype.dispose = function () {
        this.btnRetry.removeAllEventListeners("click");
        this.btnRetry.removeAllEventListeners("mousedown");
        this.btnTweet.removeAllEventListeners("click");
        this.btnTweet.removeAllEventListeners("mousedown");
        this.btnRetry = null;
        this.btnTweet = null;
        this.removeAllChildren();
    };
    return ResultView;
})(View);
//@ sourceMappingURL=ResultView.js.map
