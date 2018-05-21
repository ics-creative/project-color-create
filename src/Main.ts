import { ColorParticle } from "./view/game/ColorParticle";
import { GameView } from "./view/game/GameView";
import { ResultView } from "./view/result/ResultView";
import { TitleView } from "./view/title/TitleView";
import { ViewManager } from "./managers/ViewManager";

window.addEventListener("DOMContentLoaded", () => {
  ColorParticle.particleImage = new Image();
  ColorParticle.particleImage.onload = () => {
    new Main();
  };
  ColorParticle.particleImage.src = "images/particle_base.png";
});

export class Main {
  public stage: createjs.Stage;
  public canvas: HTMLCanvasElement;

  public manager: ViewManager;

  static FONT_NAME: string = "Impact";
  static SCALE: number;
  static STAGE_WIDTH: number = 320;
  static STAGE_HEIGHT: number = 480;
  static WIDTH: number = Main.STAGE_WIDTH;
  static HEIGHT: number = Main.STAGE_HEIGHT;
  static STAGE_OFFSET_X: number = 0;

  constructor() {
    this.canvas = <HTMLCanvasElement>document.getElementById("canv");
    this.stage = new createjs.Stage(this.canvas);

    Main.SCALE = this.canvas.height / Main.HEIGHT;
    Main.WIDTH = this.canvas.width / Main.SCALE;

    this.stage.scaleX = Main.SCALE;
    this.stage.scaleY = Main.SCALE;

    Main.STAGE_OFFSET_X =
      (this.canvas.width - Main.STAGE_WIDTH * Main.SCALE) >> 1;
    this.stage.x = Main.STAGE_OFFSET_X;

    createjs.Ticker.framerate = 60;
    createjs.Ticker.timingMode = createjs.Ticker.RAF;

    createjs.Ticker.on("tick", this.tick, this);
    this.stage.enableMouseOver(60);

    if (createjs.Touch.isSupported()) {
      createjs.Touch.enable(this.stage);
    }

    this.manager = new ViewManager();

    const titleView: TitleView = new TitleView("title");
    titleView.addToStage(this.stage);
    this.manager.addView(titleView);
    titleView.on("start", (): void => {
      this.manager.gotoView("game");
    });

    const gameView: GameView = new GameView("game");
    gameView.addToStage(this.stage);
    this.manager.addView(gameView);
    gameView.on("result", (event: any): void => {
      this.manager.gotoView("result", [(<GameView>event.target).scoreList]);
    });

    const resultView: ResultView = new ResultView("result");
    resultView.addToStage(this.stage);
    this.manager.addView(resultView);
    resultView.on("retry", (): void => {
      this.manager.gotoView("game");
    });

    console.log("this.manager.gotoView");
    this.manager.gotoView("title");
    //		this.manager.gotoView("result",[gameView.scoreList]);
  }

  private tick() {
    this.stage.update();
  }
}
