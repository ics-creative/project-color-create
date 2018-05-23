import { CcButton } from "../../components/CcButton";
import { GameConfig } from "../../configs/GameConfig";
import { UiUtil } from "../../utils/UiUtil";

import { View } from "../View";

/**
 * @author ICS-Kawakatsu
 * @since  13/05/07
 */
export class TitleView extends View {
  private _btnStart: CcButton;

  constructor($sceneId: string) {
    super($sceneId);
  }

  public init(): void {
    this._btnStart = new CcButton(187, 35, "Start");
    this._btnStart.x = GameConfig.STAGE_WIDTH >> 1;
    this._btnStart.y = 495 - 133;
    this.addChild(this._btnStart);

    this._btnStart.on("click", (): void => {
      this.dispatchEvent("start", this);
    });

    UiUtil.addText(
      this,
      "38px " + GameConfig.FONT_NAME,
      "#FFFFFF",
      GameConfig.STAGE_WIDTH >> 1,
      294 - 133,
      "Color Create"
    );

    UiUtil.addText(
      this,
      "18px " + GameConfig.FONT_NAME,
      "#CCCCCC",
      GameConfig.STAGE_WIDTH >> 1,
      350 - 133,
      "Drag with 3 Fingers"
    );

    UiUtil.addText(
      this,
      "16px " + GameConfig.FONT_NAME,
      "#CCCCCC",
      GameConfig.STAGE_WIDTH >> 1,
      450,
      "powered by ICS"
    );
  }

  /** @override */
  dispose() {
    this._btnStart.removeAllEventListeners("click");
    this._btnStart.dispose();
    this._btnStart = null;

    this.removeAllChildren();
  }
}
