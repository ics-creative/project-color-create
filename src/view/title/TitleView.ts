import { Main } from "../../Main";
import { Util } from "../../utils/Util";

import { View } from "../View";
import { CcButton } from "../../components/CcButton";

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
    this._btnStart.x = Main.STAGE_WIDTH >> 1;
    this._btnStart.y = 495 - 133;
    this.addChild(this._btnStart);

    this._btnStart.on("click", (): void => {
      this.dispatchEvent("start", this);
    });

    Util.addText(
      this,
      "32px " + Main.FONT_NAME,
      "#FFFFFF",
      Main.STAGE_WIDTH >> 1,
      294 - 133,
      "Color Create"
    );

    Util.addText(
      this,
      "18px " + Main.FONT_NAME,
      "#FFFFFF",
      Main.STAGE_WIDTH >> 1,
      361 - 133,
      "powered by ICS INC."
    );
  }

  //override
  dispose() {
    this._btnStart.removeAllEventListeners("click");
    this._btnStart.dispose();
    this._btnStart = null;

    this.removeAllChildren();
  }
}