var Stats = (function () {
    function Stats() {
    }
    Stats.prototype.getDomElement = function () {
        return null;
    };
    Stats.prototype.update = function () {
    };
    return Stats;
})();
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
var ViewManager = (function () {
    function ViewManager() {
        this.viewList = [];
    }
    ViewManager.prototype.addView = function (view) {
        this.viewList.push(view);
        view.manager = this;
    };
    ViewManager.prototype.gotoView = function ($sceneId, $datas) {
        this.datas = $datas;
        var view;
        var length = this.viewList.length;
        for(var i = 0; i < length; i++) {
            if(this.viewList[i].sceneId == $sceneId) {
                view = this.viewList[i];
                break;
            }
        }
        if(view == null) {
            console.log("do not exist sceneId");
            return;
        }
        var tween = createjs.Tween.get(this, {
            paused: true
        });
        if(this.currentView != null) {
            tween.call(this.currentView.hide, null, this.currentView).wait(this.currentView.hideTime).call(this.currentView.dispose, null, this.currentView);
        }
        this.currentView = view;
        tween.call(this.currentView.init, null, this.currentView).call(this.currentView.show, null, this.currentView).wait(this.currentView.showTime);
        tween.setPaused(false);
    };
    return ViewManager;
})();
var ColorRGB = (function () {
    function ColorRGB($uint) {
        if (typeof $uint === "undefined") { $uint = 0x0; }
        this._uint = $uint;
        this.setUint($uint);
    }
    ColorRGB.zero = [
        "ãªã—", 
        "00000", 
        "0000", 
        "000", 
        "00", 
        "0", 
        ""
    ];
    ColorRGB.prototype.setUint = function (value) {
        this.setData(value);
    };
    ColorRGB.prototype.getUint = function () {
        return this._uint;
    };
    ColorRGB.prototype.setCode = function (value) {
        this.setData(parseInt(value.split("#")[1], 16));
    };
    ColorRGB.prototype.getCode = function () {
        return this._code;
    };
    ColorRGB.prototype.setRGBString = function (value) {
        var arr = value.split("(")[1].split(")")[0].split(",");
        this.setData(parseInt(arr[0]) << 16 | parseInt(arr[1]) << 8 | parseInt(arr[2]));
    };
    ColorRGB.prototype.getRGBString = function () {
        return this._rgbString;
    };
    ColorRGB.prototype.setR = function (value) {
        this.setData(value << 16 | this._g << 8 | this._b);
    };
    ColorRGB.prototype.getR = function () {
        return this._r;
    };
    ColorRGB.prototype.setG = function (value) {
        this.setData(this._r << 16 | value << 8 | this._b);
    };
    ColorRGB.prototype.getG = function () {
        return this._g;
    };
    ColorRGB.prototype.setB = function (value) {
        this.setData(this._r << 16 | this._g << 8 | value);
    };
    ColorRGB.prototype.getB = function () {
        return this._b;
    };
    ColorRGB.prototype.setRGB = function (rValue, gValue, bValue) {
        this.setData(rValue << 16 | gValue << 8 | bValue);
    };
    ColorRGB.prototype.getRGB = function () {
        return [
            this._r, 
            this._g, 
            this._b
        ];
    };
    ColorRGB.prototype.setData = function (uintStyle) {
        this._uint = uintStyle;
        this._r = uintStyle >> 16 | 0;
        this._g = (uintStyle & 0xFF00) >> 8 | 0;
        this._b = uintStyle & 0xFF | 0;
        var code = uintStyle.toString(16).toUpperCase();
        code = ColorRGB.zero[code.length] + code;
        this._code = "#" + code;
        this._rgbString = "rgb(" + this._r + "," + this._g + "," + this._b + ")";
    };
    ColorRGB.RGBtoCMYK = function RGBtoCMYK(uint) {
        var col = new ColorRGB(uint);
        var c = 1 - col.getR() / 0xFF;
        var m = 1 - col.getG() / 0xFF;
        var y = 1 - col.getB() / 0xFF;
        var k = c > m ? (m > y ? y : m) : (c > y ? y : c);
        var k1 = 1 - k;
        return [
            (c - k) / k1, 
            (m - k) / k1, 
            (y - k) / k1, 
            k
        ];
    };
    return ColorRGB;
})();
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
var ScoreData = (function () {
    function ScoreData() {
    }
    return ScoreData;
})();
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
var ColorParticle = (function (_super) {
    __extends(ColorParticle, _super);
    function ColorParticle() {
        _super.call(this);
        var emitter = new createjs.ParticleEmitter(ColorParticle.particleImage);
        emitter.position = new createjs.Point(0, 0);
        emitter.emitterType = createjs.ParticleEmitterType.Emit;
        emitter.emissionRate = 45;
        emitter.maxParticles = 100;
        emitter.life = 1000;
        emitter.lifeVar = 0;
        emitter.speed = 100;
        emitter.speedVar = 30;
        emitter.positionVarX = 10;
        emitter.positionVarY = 10;
        emitter.accelerationX = 0;
        emitter.accelerationY = 0;
        emitter.radialAcceleration = 0;
        emitter.radialAccelerationVar = 0;
        emitter.tangentalAcceleration = 0;
        emitter.tangentalAccelerationVar = 0;
        emitter.angle = 0;
        emitter.angleVar = 360;
        emitter.startSpin = 0;
        emitter.startSpinVar = 0;
        emitter.endSpin = null;
        emitter.endSpinVar = null;
        emitter.startColor = [
            200, 
            128, 
            255
        ];
        emitter.startColorVar = [
            60, 
            25, 
            25
        ];
        emitter.startOpacity = 1;
        emitter.endColor = null;
        emitter.endColorVar = null;
        emitter.endOpacity = null;
        emitter.startSize = 50;
        emitter.startSizeVar = 20;
        emitter.endSize = 0;
        emitter.endSizeVar = 10;
        this.addChild(emitter);
        this.emitter = emitter;
        this.color = new ColorRGB();
    }
    ColorParticle.prototype.setData = function (col, xx, yy, speed) {
        this.color.setUint(col);
        this.emitter.startColor = this.color.getRGB();
        this.emitter.startColorVar = [
            25 * 4, 
            25 * 4, 
            25 * 4
        ];
        this.emitter.position.x = xx;
        this.emitter.position.y = yy;
        this.emitter.speed = speed;
    };
    ColorParticle.prototype.setOnlyColor = function (col, speed, size) {
        this.color.setUint(col);
        this.emitter.startColor = this.color.getRGB();
        this.emitter.startColorVar = [
            25, 
            25, 
            25
        ];
        this.emitter.speed = speed;
        this.emitter.startSize = size;
    };
    return ColorParticle;
})(createjs.Container);
var ResultCover = (function (_super) {
    __extends(ResultCover, _super);
    function ResultCover() {
        var _this = this;
        _super.call(this);
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.color = new ColorRGB();
        this.cover = Util.getRectShape(Main.WIDTH * Main.SCALE, Main.HEIGHT, "#000000", 0.8);
        this.cover.x = -Main.STAGE_OFFSET_X;
        this.addChild(this.cover);
        var reticle = new TargetReticle();
        this.addChild(reticle);
        reticle.x = 155 + 37 - 32;
        reticle.y = 312 + 37 - 133;
        reticle.drawReticle(0x666666, 37, 37, 65, 65);
        this.reticle = reticle;
        this.textResult = Util.addText(this, "24px " + Main.FONT_NAME, "#FFFFFF", 94 - 32, 177 - 133, "Your Color #321869");
        this.textTarget = Util.addText(this, "24px " + Main.FONT_NAME, "#FFFFFF", 77 - 32, 208 - 133, "Target Color #321869");
        this.textTime = Util.addText(this, "20px " + Main.FONT_NAME, "#FFFFFF", Main.STAGE_WIDTH >> 1, 325 - 133, "Time\n10.0");
        this.textTime.textAlign = "center";
        this.textR = Util.addText(this, "40px " + Main.FONT_NAME, "#FF0000", (Main.STAGE_WIDTH >> 1) - 40, 357 - 133, "100%");
        this.textR.textAlign = "right";
        this.textG = Util.addText(this, "40px " + Main.FONT_NAME, "#00FF00", Main.STAGE_WIDTH >> 1, 259 - 133, "100%");
        this.textG.textAlign = "center";
        this.textB = Util.addText(this, "40px " + Main.FONT_NAME, "#0000FF", (Main.STAGE_WIDTH >> 1) + 40, 357 - 133, "100%");
        this.textB.textAlign = "left";
        this.containerScore = new createjs.Container();
        this.addChild(this.containerScore);
        this.textScore = Util.addText(this.containerScore, "44px " + Main.FONT_NAME, "#FFFFFF", 80 - 32, 443 - 133, "Score: 888888");
        this.textScore.textAlign = "center";
        this.containerScore.x = Main.STAGE_WIDTH >> 1;
        this.containerScore.y = this.textScore.y;
        this.textScore.x = 0;
        this.textScore.y = -20;
        this.containerButton = new createjs.Container();
        this.addChild(this.containerButton);
        this.btnShape = Util.getRoundRectShape(187, 35, 5, "#FFFFFF", 1);
        this.containerButton.addChild(this.btnShape);
        this.btnShape.x = 104 - 32;
        this.btnShape.y = 534 - 133;
        this.btnShape.addEventListener("click", function () {
            _this.dispatchEvent("next", _this);
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
        var next = Util.addText(this.containerButton, "24px " + Main.FONT_NAME, "#000000", 144 - 32, 537 - 133, "Next Round");
        this.containerButton.x = Main.STAGE_WIDTH >> 1;
        this.containerButton.y = this.btnShape.y + 17;
        next.x -= Main.STAGE_WIDTH >> 1;
        next.y = -14;
        this.btnShape.x -= Main.STAGE_WIDTH >> 1;
        this.btnShape.y = -17;
        this.play = false;
    }
    ResultCover.prototype.setData = function (data) {
        var col = new ColorRGB();
        col.setUint(data.result);
        this.textResult.color = col.getRGBString();
        this.textResult.text = "Your Color " + col.getCode();
        col.setUint(data.target);
        this.textTarget.color = col.getRGBString();
        this.textTarget.text = "Target Color " + col.getCode();
        this.textR.text = String(data.r) + "%";
        this.textG.text = String(data.g) + "%";
        this.textB.text = String(data.b) + "%";
        this.textTime.text = "Time\n" + String(data.time.toFixed(1));
        this.textScore.text = "Score: " + String(data.total);
        this.textTarget.alpha = 0;
        this.textResult.alpha = 0;
        createjs.Tween.get(this.textTarget).to({
            alpha: 1.0
        }, 300, createjs.Ease.getPowOut(2));
        createjs.Tween.get(this.textResult).to({
            alpha: 1.0
        }, 300, createjs.Ease.getPowOut(2));
        this.textTime.alpha = 0;
        createjs.Tween.get(this.textTime).wait(400).to({
            alpha: 1.0
        }, 300, createjs.Ease.getPowOut(2));
        this.textR.alpha = 0;
        createjs.Tween.get(this.textR).wait(500).to({
            alpha: 1.0
        }, 300, createjs.Ease.getPowOut(2));
        this.textG.alpha = 0;
        createjs.Tween.get(this.textG).wait(550).to({
            alpha: 1.0
        }, 300, createjs.Ease.getPowOut(2));
        this.textB.alpha = 0;
        createjs.Tween.get(this.textB).wait(600).to({
            alpha: 1.0
        }, 300, createjs.Ease.getPowOut(2));
        this.r = 0;
        this.g = 0;
        this.b = 0;
        createjs.Tween.get(this).wait(800).set({
            r: 0,
            g: 0,
            b: 0
        }).to({
            r: data.r,
            g: data.g,
            b: data.b
        }, 400).call(this.onTick).set({
            play: false
        });
        this.reticle.scaleX = 0.0;
        this.reticle.scaleY = 0.0;
        createjs.Tween.get(this.reticle).wait(800).to({
            scaleX: 1.0,
            scaleY: 1.0
        }, 400, createjs.Ease.getPowOut(2));
        this.containerScore.scaleX = 4.0;
        this.containerScore.scaleY = 4.0;
        this.containerScore.alpha = 0.0;
        createjs.Tween.get(this.containerScore).wait(1300).to({
            scaleX: 1.0,
            scaleY: 1.0
        }, 200, createjs.Ease.getBackOut(1));
        createjs.Tween.get(this.containerScore).wait(1300).to({
            alpha: 1.0
        }, 200, createjs.Ease.getPowOut(3));
        this.containerButton.scaleX = 0.0;
        this.containerButton.scaleY = 0.0;
        createjs.Tween.get(this.containerButton).wait(1600).to({
            scaleX: 1.0,
            scaleY: 1.0
        }, 300, createjs.Ease.getPowOut(5));
        this.play = true;
    };
    ResultCover.prototype.onTick = function () {
        if(!this.play) {
            return;
        }
        this.textR.text = String(this.r | 0) + "%";
        this.textG.text = String(this.g | 0) + "%";
        this.textB.text = String(this.b | 0) + "%";
    };
    return ResultCover;
})(createjs.Container);
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView($sceneId) {
        _super.call(this, $sceneId);
        this.TIME_LIMIT = 10.0;
        this.ROUND_MAX = 3;
    }
    GameView.prototype.init = function () {
        var _this = this;
        this.canvas = document.getElementById("canv");
        this.stage.addEventListener("stagemousedown", function (event) {
            _this.canvas_touchStartHandler(event);
        });
        this.stage.addEventListener("stagemousemove", function (event) {
            _this.canvas_touchMoveHandler(event);
        });
        this.stage.addEventListener("stagemouseup", function (event) {
            _this.canvas_touchEndHandler(event);
        });
        Util.addText(this, "20px " + Main.FONT_NAME, "#FFFFFF", 96 - 32, 180 - 133, "You");
        Util.addText(this, "20px " + Main.FONT_NAME, "#FFFFFF", 241 - 32, 180 - 133, "Target");
        this.textRound = Util.addText(this, "20px " + Main.FONT_NAME, "#FFFFFF", 158 - 32, 147 - 133, "Round");
        this.textTime = Util.addText(this, "48px " + Main.FONT_NAME, "#FFFFFF", Main.STAGE_WIDTH >> 1, 173 - 133, String(this.TIME_LIMIT));
        this.textTime.textAlign = "center";
        var rect = new ColorRect();
        rect.drawRect(0xFFFFFF, 45);
        this.addChild(rect);
        rect.x = 224 + 45 - 32;
        rect.y = 215 + 45 - 133;
        this.targetRect = rect;
        var rect = new ColorRect();
        rect.drawRect(0xFFFFFF, 45);
        this.addChild(rect);
        rect.x = 74 + 45 - 32;
        rect.y = 215 + 45 - 133;
        this.currentRect = rect;
        this.reticle = new TargetReticle();
        this.addChild(this.reticle);
        this.reticle.visible = false;
        this.centerPointX = Main.STAGE_WIDTH >> 1;
        this.centerPointY = (215 + 90 - 133) + ((Main.STAGE_HEIGHT - (215 + 90 - 133)) >> 1);
        this.particleRange = 150;
        this.thetaDelay = Math.PI * 2 / 3;
        this.usedCircles = [];
        this.currentParticleList = [];
        this.currentTouchList = [];
        var names = [
            "r", 
            "g", 
            "b"
        ];
        var colors = [
            0xFF0000, 
            0x00FF00, 
            0x0000FF
        ];
        var colorParticle;
        for(var i = 0; i < 3; i++) {
            var circle = new TouchCircle(names[i], 10, 105, 25, colors[i]);
            this.addChild(circle);
            circle.x = this.centerPointX;
            circle.y = this.centerPointY;
            this.usedCircles[i] = circle;
            colorParticle = new ColorParticle();
            this.addChild(colorParticle);
            this.currentParticleList[i] = colorParticle;
            this.currentTouchList[i] = null;
        }
        var centerCircle = new TouchCircle("", 5, 0, 0);
        centerCircle.drawCircle(0xFFFFFF, 20);
        this.addChild(centerCircle);
        centerCircle.visible = false;
        this.gp = centerCircle;
        colorParticle = new ColorParticle();
        this.addChild(colorParticle);
        this.gpParticle = colorParticle;
        this.containerTextStart = new createjs.Container();
        this.addChild(this.containerTextStart);
        this.containerTextStart.x = Main.STAGE_WIDTH >> 1;
        this.containerTextStart.y = Main.STAGE_HEIGHT >> 1;
        this.textStart = Util.addText(this.containerTextStart, "50px " + Main.FONT_NAME, "#FFFFFF", 0, -25, "Start");
        this.textStart.textAlign = "center";
        this.cover = new ResultCover();
        this.cover.alpha = 0.0;
        this.addChild(this.cover);
        this.cover.addEventListener("next", function () {
            _this.next();
        });
        this.round = this.ROUND_MAX;
        this.scoreList = new Array();
        this.theta = 0;
        this.start();
        createjs.Ticker.addListener(this);
        this.tick = this.onTick;
    };
    GameView.prototype.onTick = function () {
        if(this.state == 0 || this.state == 1) {
            this.theta += 0.01;
            var length = this.currentTouchList.length;
            for(var i = 0; i < length; i++) {
                var circle = this.usedCircles[i];
                if(this.currentTouchList[i] != null) {
                    circle.x += ((this.currentTouchList[i].stageX - Main.STAGE_OFFSET_X) / Main.SCALE - circle.x) * 0.4;
                    circle.y += (this.currentTouchList[i].stageY / Main.SCALE - circle.y) * 0.4;
                } else {
                    var theta2 = this.theta + i * this.thetaDelay;
                    circle.x += (this.centerPointX + this.particleRange * Math.cos(theta2) - circle.x) * 0.01;
                    circle.y += (this.centerPointY + this.particleRange * Math.sin(theta2) - circle.y) * 0.01;
                }
                this.currentParticleList[i].setData(circle.color.getUint(), circle.x, circle.y, 25);
            }
        }
        if(this.state == 2) {
            this.timeLeft = this.TIME_LIMIT - (new Date().getTime() - this.startTime) / 1000;
            if(this.timeLeft <= 0) {
                this.timeLeft = 0;
                this.textTime.text = "0.0";
                this.end();
            } else {
                this.textTime.text = String((this.timeLeft.toFixed(1)));
            }
        }
    };
    GameView.prototype.canvas_touchStartHandler = function (event) {
        if(this.state != 1) {
            return;
        }
        var circleLength = this.currentTouchList.length;
        var nx = (event.stageX - Main.STAGE_OFFSET_X) / Main.SCALE;
        var ny = event.stageY / Main.SCALE;
        var rangeList = [];
        for(var i = 0; i < circleLength; i++) {
            if(this.currentTouchList[i] == null) {
                var targetCircle = this.usedCircles[i];
                var dx = nx - targetCircle.x;
                var dy = ny - targetCircle.y;
                rangeList.push(new Distance(i, dx * dx + dy * dy));
            }
        }
        if(rangeList.length != 0) {
            rangeList.sort(Distance.sorter);
            this.currentTouchList[rangeList[0].i] = event;
        }
        for(var i = 0; i < circleLength; i++) {
            if(this.currentTouchList[i] == null) {
                return;
            }
        }
        this.startHandle(event);
    };
    GameView.prototype.startHandle = function (event) {
        this.state = 2;
        this.startTime = new Date().getTime();
        var arr = this.currentTouchList;
        var touch;
        var circle;
        var circleLength = this.currentTouchList.length;
        var xx = 0;
        var yy = 0;
        for(var j = 0; j < circleLength; j++) {
            touch = arr[j];
            xx += (touch.stageX - Main.STAGE_OFFSET_X) / Main.SCALE;
            yy += touch.stageY / Main.SCALE;
        }
        xx /= circleLength;
        yy /= circleLength;
        this.gp.init(0, xx, yy);
        this.gp.visible = true;
        this.gpParticle.x = xx;
        this.gpParticle.y = yy;
        this.gpParticle.visible = true;
        for(var i = 0; i < circleLength; i++) {
            touch = arr[i];
            circle = this.usedCircles[i];
            circle.init(touch.pointerID, xx, yy);
            circle.drawCircle(0x0, 20);
        }
        this.canvas_touchMoveHandler(event);
        this.reticle.visible = true;
        this.reticle.drawReticle(0x666666, 25, 60, 100, 105);
        this.reticle.x = xx;
        this.reticle.y = yy;
        this.reticle.scaleX = 5;
        this.reticle.scaleY = 5;
        this.reticle.rotation = -180;
        createjs.Tween.get(this.reticle).to({
            scaleX: 1,
            scaleY: 1
        }, 300, createjs.Ease.backOut).wait(100).to({
            rotation: 0
        }, 300, createjs.Ease.backOut);
    };
    GameView.prototype.canvas_touchMoveHandler = function (event) {
        var length3 = this.currentTouchList.length;
        for(var l = 0; l < length3; l++) {
            if(this.currentTouchList[l] && this.currentTouchList[l].pointerID == event.pointerID) {
                this.currentTouchList[l] = event;
                break;
            }
        }
        if(this.state != 2) {
            return;
        }
        var col = new ColorRGB();
        var touch;
        var circle;
        var circleLength = this.usedCircles.length;
        for(var j = 0; j < circleLength; j++) {
            circle = this.usedCircles[j];
            touch = this.currentTouchList[j];
            var percent = circle.getDPercent((touch.stageX - Main.STAGE_OFFSET_X) / Main.SCALE, touch.stageY / Main.SCALE);
            var colValue = 0xFF * percent | 0;
            var colUint;
            switch(circle.colorName) {
                case "r":
                    col.setR(colValue);
                    colUint = colValue << 16;
                    break;
                case "g":
                    col.setG(colValue);
                    colUint = colValue << 8;
                    break;
                case "b":
                    col.setB(colValue);
                    colUint = colValue;
                    break;
                default:
                    break;
            }
            circle.setData(colUint, 15 + 15 * percent, (touch.stageX - Main.STAGE_OFFSET_X) / Main.SCALE, touch.stageY / Main.SCALE, String(colValue));
            this.currentParticleList[j].setData(circle.baseColor, circle.x, circle.y, 30 + 50 * percent);
        }
        this.currentRect.drawRect(col.getUint(), 45);
        var targetColor = this.targetRect.color;
        var resultColor = this.currentRect.color;
        var t;
        var c;
        var pointScale;
        t = targetColor.getR();
        pointScale = 255 - t;
        pointScale = t > pointScale ? t : pointScale;
        c = resultColor.getR();
        var rP = (1 - Math.abs(c - t) / pointScale) * 100 | 0;
        rP = rP < 0 ? 0 : rP;
        t = targetColor.getG();
        pointScale = 255 - t;
        pointScale = t > pointScale ? t : pointScale;
        c = resultColor.getG();
        var gP = (1 - Math.abs(c - t) / pointScale) * 100 | 0;
        gP = gP < 0 ? 0 : gP;
        t = targetColor.getB();
        pointScale = 255 - t;
        pointScale = t > pointScale ? t : pointScale;
        c = resultColor.getB();
        var bP = (1 - Math.abs(c - t) / pointScale) * 100 | 0;
        bP = bP < 0 ? 0 : bP;
        var perfect = (rP + gP + bP) / 300;
        this.gp.drawCircle(col.getUint(), 15 + perfect * 15);
        this.gpParticle.setOnlyColor(col.getUint(), 10 + perfect * 30, 20 + perfect * 30);
    };
    GameView.prototype.canvas_touchEndHandler = function (event) {
        var length3 = this.currentTouchList.length;
        for(var l = 0; l < length3; l++) {
            if(this.currentTouchList[l] && this.currentTouchList[l].pointerID == event.pointerID) {
                this.currentTouchList[l] = null;
                break;
            }
        }
        if(this.state != 2) {
            return;
        }
        var end = false;
        var circle;
        var circleLength = this.usedCircles.length;
        for(var j = 0; j < circleLength; j++) {
            circle = this.usedCircles[j];
            if(event.pointerID == circle.identifier) {
                end = true;
                break;
            }
        }
        if(!end) {
            return;
        }
        this.end();
    };
    GameView.prototype.end = function () {
        this.state = 3;
        this.check();
    };
    GameView.prototype.check = function () {
        var t;
        var c;
        var rP;
        var gP;
        var bP;
        var targetColor = this.targetRect.color;
        var resultColor = this.currentRect.color;
        var pointScale;
        t = targetColor.getR();
        pointScale = 255 - t;
        pointScale = t > pointScale ? t : pointScale;
        c = resultColor.getR();
        rP = (1 - Math.abs(c - t) / pointScale) * 100 | 0;
        rP = rP < 0 ? 0 : rP;
        t = targetColor.getG();
        pointScale = 255 - t;
        pointScale = t > pointScale ? t : pointScale;
        c = resultColor.getG();
        gP = (1 - Math.abs(c - t) / pointScale) * 100 | 0;
        gP = gP < 0 ? 0 : gP;
        t = targetColor.getB();
        pointScale = 255 - t;
        pointScale = t > pointScale ? t : pointScale;
        c = resultColor.getB();
        bP = (1 - Math.abs(c - t) / pointScale) * 100 | 0;
        bP = bP < 0 ? 0 : bP;
        var score = (rP + gP + bP) / 3;
        var ss = score >> 2;
        var totalScore = (ss * ss * ss) * (100 + this.timeLeft * this.timeLeft) / 1000;
        var scoreData = new ScoreData();
        scoreData.time = this.timeLeft;
        scoreData.r = rP | 0;
        scoreData.g = gP | 0;
        scoreData.b = bP | 0;
        scoreData.average = score | 0;
        scoreData.total = Math.floor(totalScore);
        scoreData.target = targetColor.getUint();
        scoreData.result = resultColor.getUint();
        this.scoreList[this.ROUND_MAX - this.round] = scoreData;
        this.cover.setData(scoreData);
        this.cover.visible = true;
        this.cover.alpha = 0.0;
        createjs.Tween.get(this.cover).to({
            alpha: 1.0
        }, 300, createjs.Ease.getPowOut(2));
    };
    GameView.prototype.start = function () {
        this.gp.visible = false;
        this.gpParticle.visible = false;
        var circleLength = this.usedCircles.length;
        for(var j = 0; j < circleLength; j++) {
            this.usedCircles[j].initDraw(this.usedCircles[j].baseColor, 25);
        }
        this.reticle.visible = false;
        createjs.Tween.get(this.cover).to({
            alpha: 0.0
        }, 300, createjs.Ease.getPowOut(2)).set({
            visible: false
        });
        var rr = 20 + 235 * Math.random();
        var gg = 20 + 235 * Math.random();
        var bb = 20 + 235 * Math.random();
        this.targetRect.drawRect(rr << 16 | gg << 8 | bb | 0, 45);
        this.currentRect.drawRect(0x0, 45);
        this.state = 0;
        this.textTime.text = "";
        this.textStart.text = "Round " + (this.ROUND_MAX - this.round + 1) + " Start!";
        this.textRound.text = "Round " + (this.ROUND_MAX - this.round + 1);
        this.containerTextStart.alpha = 0.0;
        this.containerTextStart.scaleX = 1.0;
        this.containerTextStart.scaleY = 1.0;
        createjs.Tween.get(this.containerTextStart).wait(300).to({
            alpha: 1.0
        }, 200).wait(1000).to({
            alpha: 0.0,
            scaleX: 4.0,
            scaleY: 4.0
        }, 300, createjs.Ease.getElasticInOut(2, 1));
        createjs.Tween.get(this).wait(1300).set({
            state: 1
        });
    };
    GameView.prototype.next = function () {
        this.round--;
        if(this.round > 0) {
            this.start();
        } else {
            this.dispatchEvent("result", this);
        }
    };
    GameView.prototype.dispose = function () {
        this.stage.removeAllEventListeners("stagemousedown");
        this.stage.removeAllEventListeners("stagemousemove");
        this.stage.removeAllEventListeners("stagemouseup");
        this.canvas = null;
        this.targetRect = null;
        this.currentRect = null;
        this.reticle = null;
        this.gp = null;
        this.gpParticle = null;
        for(var i = 0; i < 3; i++) {
            var circle = this.usedCircles[i];
            var colorParticle = this.currentParticleList[i];
        }
        this.usedCircles = null;
        this.currentTouchList = null;
        this.currentParticleList = null;
        this.textTime = null;
        this.textStart = null;
        this.textRound = null;
        this.cover.removeAllEventListeners("next");
        this.cover = null;
        this.scoreList = null;
        this.tick = null;
        this.removeAllChildren();
    };
    return GameView;
})(View);
var Distance = (function () {
    function Distance(i, d) {
        this.i = i;
        this.d = d;
    }
    Distance.sorter = function sorter(a, b) {
        if(a.d < b.d) {
            return -1;
        }
        if(a.d > b.d) {
            return 1;
        }
        return 0;
    };
    return Distance;
})();
var Main = (function () {
    function Main() {
        var _this = this;
        this.canvas = document.getElementById("canv");
        this.stage = new createjs.Stage(this.canvas);
        Main.SCALE = this.canvas.height / Main.HEIGHT;
        Main.WIDTH = this.canvas.width / Main.SCALE;
        this.stage.scaleX = Main.SCALE;
        this.stage.scaleY = Main.SCALE;
        Main.STAGE_OFFSET_X = (this.canvas.width - Main.STAGE_WIDTH * Main.SCALE) >> 1;
        this.stage.x = Main.STAGE_OFFSET_X;
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addListener(this);
        this.stage.enableMouseOver(60);
        if(createjs.Touch.isSupported()) {
            createjs.Touch.enable(this.stage);
        }
        this.manager = new ViewManager();
        var titleView = new TitleView("title");
        titleView.addToStage(this.stage);
        this.manager.addView(titleView);
        titleView.addEventListener("start", function () {
            _this.manager.gotoView("game");
        });
        var gameView = new GameView("game");
        gameView.addToStage(this.stage);
        this.manager.addView(gameView);
        gameView.addEventListener("result", function (event) {
            _this.manager.gotoView("result", [
                (event.target).scoreList
            ]);
        });
        var resultView = new ResultView("result");
        resultView.addToStage(this.stage);
        this.manager.addView(resultView);
        resultView.addEventListener("retry", function () {
            _this.manager.gotoView("game");
        });
        this.manager.gotoView("title");
    }
    Main.FONT_NAME = "Impact";
    Main.STAGE_WIDTH = 320;
    Main.STAGE_HEIGHT = 480;
    Main.WIDTH = Main.STAGE_WIDTH;
    Main.HEIGHT = Main.STAGE_HEIGHT;
    Main.STAGE_OFFSET_X = 0;
    Main.main = function main() {
        ColorParticle.particleImage = new Image();
        ColorParticle.particleImage.onload = Main.assetLoadComplete;
        ColorParticle.particleImage.src = "images/particle_base.png";
    };
    Main.assetLoadComplete = function assetLoadComplete() {
        new Main();
    };
    Main.prototype.tick = function () {
        this.stage.update();
    };
    return Main;
})();
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
            str += "Round" + (i + 1) + ": " + score.total + "\n";
            roundTotal += score.total;
            textList[i] = Util.addText(this, "24px " + Main.FONT_NAME, "#FFFFFF", 116 - 32, 234 - 133 + i * 32, "Round" + (i + 1) + ": " + score.total);
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
        this.btnTweet.visible = false;
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
//@ sourceMappingURL=App.js.map
