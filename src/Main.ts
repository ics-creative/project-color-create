/// <reference path="lib/easeljs.d.ts" />
/// <reference path="lib/tweenjs.d.ts" />

/// <reference path="lib/Stats.ts" />

/// <reference path="ViewManager.ts" />
/// <reference path="TitleView.ts" />
/// <reference path="GameView.ts" />
/// <reference path="ResultView.ts" />

class Main {
	public width:number;
	public height:number;

	public stage:createjs.Stage;
	public canvas:HTMLCanvasElement;
	public stats:Stats;

	public manager:ViewManager;

	static FONT_NAME:string = "Impact";
	static SCALE:number;
	static STAGE_WIDTH:number = 320;
	static STAGE_HEIGHT:number = 480;
	static WIDTH:number = Main.STAGE_WIDTH;
	static HEIGHT:number = Main.STAGE_HEIGHT;
	static STAGE_OFFSET_X:number = 0;

	static main():void {
		//alert("Hello World!");

		ColorParticle.particleImage = new Image();
		ColorParticle.particleImage.onload = assetLoadComplete;
		ColorParticle.particleImage.src = "images/particle_base.png";
	}

	static assetLoadComplete():void {
		new Main();
	}

	constructor() {
		this.canvas = <HTMLCanvasElement>document.getElementById("canv");
		this.stage = new createjs.Stage(this.canvas);

		Main.SCALE = this.canvas.height / Main.HEIGHT;
		Main.WIDTH = this.canvas.width / Main.SCALE;

		this.stage.scaleX = Main.SCALE;
		this.stage.scaleY = Main.SCALE;

		Main.STAGE_OFFSET_X = (this.canvas.width - Main.STAGE_WIDTH * Main.SCALE) >> 1;
		this.stage.x = Main.STAGE_OFFSET_X;


//		this.stats = new Stats();
//		(<HTMLDivElement>document.getElementById("stats")).appendChild(this.stats.domElement);


		createjs.Ticker.setFPS(60);
		createjs.Ticker.addListener(this);
		this.stage.enableMouseOver(60);

		if (createjs.Touch.isSupported()) {
			createjs.Touch.enable(this.stage);
		}

		this.manager = new ViewManager();

		var titleView:TitleView = new TitleView("title");
		titleView.addToStage(this.stage);
		this.manager.addView(titleView);
		titleView.addEventListener("start", ():void => {
			this.manager.gotoView("game");
		});

		var gameView:GameView = new GameView("game");
		gameView.addToStage(this.stage);
		this.manager.addView(gameView);
		gameView.addEventListener("result", (event:any):void => {
			this.manager.gotoView("result", [(<GameView>event.target).scoreList]);
		});

		var resultView:ResultView = new ResultView("result");
		resultView.addToStage(this.stage);
		this.manager.addView(resultView);
		resultView.addEventListener("retry", ():void => {
			this.manager.gotoView("game");
		});

		this.manager.gotoView("title");
//		this.manager.gotoView("result",[gameView.scoreList]);
	}

	tick() {
		this.stage.update();
//		this.stats.update();
	}
}