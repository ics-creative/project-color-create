import { GameConfig } from "./configs/GameConfig";
import { SharedParams } from "./configs/SharedParams";
import { ColorParticle } from "./view/game/ColorParticle";
import { GameView } from "./view/game/GameView";
import { ResultView } from "./view/result/ResultView";
import { TitleView } from "./view/title/TitleView";
import { ViewManager } from "./managers/ViewManager";

window.addEventListener("DOMContentLoaded", () => {
  new Main();
});

export class Main {
  private readonly stage: createjs.Stage;
  private readonly canvas: HTMLCanvasElement;
  private readonly manager: ViewManager;

  constructor() {
    this.canvas = <HTMLCanvasElement>document.getElementById("my-canvas");

    this.stage = new createjs.Stage(this.canvas);

    window.addEventListener("resize", () => {
      this.resize();
    });
    this.resize();

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

    this.manager.gotoView("title");
  }

  private tick() {
    this.stage.update();
  }

  private resize() {
    this.canvas.width = innerWidth * devicePixelRatio;
    this.canvas.height = innerHeight * devicePixelRatio;
    this.canvas.style.width = `${innerWidth}px`;
    this.canvas.style.height = `${innerHeight}px`;

    const sx = this.canvas.width / GameConfig.STAGE_WIDTH;
    const sy = this.canvas.height / GameConfig.STAGE_HEIGHT;

    const scale = Math.min(sx, sy);

    this.stage.scaleX = scale;
    this.stage.scaleY = scale;

    SharedParams.SCALE = scale;

    const offsetX = (this.canvas.width - GameConfig.STAGE_WIDTH * scale) / 2;
    const offsetY = (this.canvas.height - GameConfig.STAGE_HEIGHT * scale) / 2;
    this.stage.x = offsetX;
    // this.stage.y = offsetY;
  }
}
