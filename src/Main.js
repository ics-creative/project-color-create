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
//@ sourceMappingURL=Main.js.map
