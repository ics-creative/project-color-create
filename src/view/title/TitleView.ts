import { Main } from "../../Main";
import { Util } from "../../utils/Util";

import { View } from "../View";

/**
 * @author ICS-Kawakatsu
 * @since  13/05/07
 */
export class TitleView extends View {
  public canvas: HTMLCanvasElement;
  public btnShape: createjs.Shape;

  constructor($sceneId: string) {
    super($sceneId);
  }

  public init(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById("canv");

    this.btnShape = Util.getRoundRectShape(187, 35, 5, "#FFFFFF", 1);
    this.addChild(this.btnShape);
    this.btnShape.x = (Main.STAGE_WIDTH >> 1) - 93;
    this.btnShape.y = 495 - 133;
    this.btnShape.on("click", (): void => {
      this.dispatchEvent("start", this);
    });
    this.btnShape.on("mousedown", (event: createjs.MouseEvent): void => {
      createjs.Tween.get(this.btnShape, { override: true }).to(
        { alpha: 0.5 },
        250,
        createjs.Ease.cubicOut
      );
    });

    this.btnShape.on("mouseup", (): void => {
      createjs.Tween.get(this.btnShape, { override: true }).to(
        { alpha: 1.0 },
        250,
        createjs.Ease.cubicOut
      );
    });

    Util.addText(
      this,
      "48px " + Main.FONT_NAME,
      "#FFFFFF",
      Main.STAGE_WIDTH >> 1,
      294 - 133,
      "Color Create"
    ).textAlign =
      "center";
    Util.addText(
      this,
      "18px " + Main.FONT_NAME,
      "#FFFFFF",
      Main.STAGE_WIDTH >> 1,
      361 - 133,
      "powered by ICS INC."
    ).textAlign =
      "center";
    Util.addText(
      this,
      "24px " + Main.FONT_NAME,
      "#000000",
      Main.STAGE_WIDTH >> 1,
      498 - 133,
      "Start"
    ).textAlign =
      "center";
  }

  //	onTick() {
  //
  //	}

  //override
  dispose() {
    this.btnShape.removeAllEventListeners("click");
    this.btnShape.removeAllEventListeners("mousedown");
    this.btnShape = null;

    this.removeAllChildren();
    this.removeAllChildren();
  }
}
