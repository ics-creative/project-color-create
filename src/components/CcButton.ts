import { Main } from "../Main";
import { Util } from "../utils/Util";

/**
 * @author ICS-Ikeda
 * @since 2018-05-21
 */
export class CcButton extends createjs.Container {
  private _btnShape: createjs.Shape;

  constructor(width: number, height: number, label: string) {
    super();

    this.cursor = "pointer";

    this.regX = width / 2;
    this.regY = height / 2;

    const btnShape = Util.getRoundRectShape(width, height, 5, "#FFFFFF", 1);
    this.addChild(btnShape);

    btnShape.on("mousedown", (event: createjs.MouseEvent): void => {
      createjs.Tween.get(btnShape, { override: true }).to(
        { alpha: 0.5 },
        250,
        createjs.Ease.cubicOut
      );
    });

    btnShape.on("mouseup", (): void => {
      createjs.Tween.get(btnShape, { override: true }).to(
        { alpha: 1.0 },
        250,
        createjs.Ease.cubicOut
      );
    });
    this._btnShape = btnShape;

    Util.addText(
      this,
      "24px " + Main.FONT_NAME,
      "#000000",
      Math.round(width / 2),
      Math.round(height / 2),
      label,
      "center",
      "middle"
    );
  }

  public dispose(): void {
    this._btnShape.removeAllEventListeners("mousedown");
    this._btnShape.removeAllEventListeners("mouseup");
    this.removeAllChildren();
    this._btnShape = null;
  }
}
