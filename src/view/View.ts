import { ViewManager } from "../managers/ViewManager";

/**
 * @author ICS-Kawakatsu
 * @since  13/05/07
 */
export class View extends createjs.Container {
  public sceneId: string;
  public showTime: number = 300;
  public hideTime: number = 300;
  public manager: ViewManager;

  constructor($sceneId: string) {
    super();
    this.sceneId = $sceneId;
  }

  public addToStage($stage: createjs.Stage) {
    $stage.addChild(this);
  }

  public init(): void {}

  public show(): void {
    this.alpha = 0.0;
    createjs.Tween.get(this).to(
      { alpha: 1.0 },
      this.showTime,
      createjs.Ease.getPowOut(2)
    );
    this.visible = true;
  }

  public hide(): void {
    this.alpha = 1.0;
    createjs.Tween.get(this)
      .to({ alpha: 0.0 }, this.showTime, createjs.Ease.getPowOut(2))
      .set({ visible: false });
    this.visible = true;
  }

  public dispose(): void {}
}
