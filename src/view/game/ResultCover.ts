import { CcButton } from "../../components/CcButton";
import { ColorRGB } from "../../utils/ColorRGB";

import { Main } from "../../Main";
import { ScoreData } from "../../data/ScoreData";
import { TargetReticle } from "./TargetReticle";
import { Util } from "../../utils/Util";

/**
 * @author ICS-Kawakatsu
 * @since  13/04/25
 */
export class ResultCover extends createjs.Container {
  private _color: ColorRGB;
  private _cover: createjs.Shape;
  private _btnNext: CcButton;
  private _textResult: createjs.Text;
  private _textTarget: createjs.Text;
  private _textTime: createjs.Text;
  private _textR: createjs.Text;
  private _textG: createjs.Text;
  private _textB: createjs.Text;
  private _textScore: createjs.Text;

  private containerScore: createjs.Container;

  private reticle: TargetReticle;
  private _isPlaying: boolean;
  private r: number = 0;
  private g: number = 0;
  private b: number = 0;

  constructor() {
    super();

    this._color = new ColorRGB();

    this._cover = Util.getRectShape(
      Main.STAGE_WIDTH * 2,
      Main.STAGE_HEIGHT * 2,
      "#000000",
      0.8
    );
    this._cover.x = -0.5 * Main.STAGE_WIDTH;
    this._cover.y = -0.5 * Main.STAGE_HEIGHT;
    this.addChild(this._cover);

    const reticle = new TargetReticle();
    this.addChild(reticle);
    reticle.x = 155 + 37 - 32;
    reticle.y = 312 + 37 - 133;
    reticle.drawReticle(0x666666, 37, 37, 65, 65);
    this.reticle = reticle;

    this._textResult = Util.addText(
      this,
      "18px " + Main.FONT_NAME,
      "#FFFFFF",
      Main.STAGE_WIDTH / 2,
      177 - 133,
      "Your Color #000000"
    );
    this._textTarget = Util.addText(
      this,
      "18px " + Main.FONT_NAME,
      "#FFFFFF",
      Main.STAGE_WIDTH / 2,
      208 - 133,
      "Target Color #000000"
    );
    this._textTime = Util.addText(
      this,
      "20px " + Main.FONT_NAME,
      "#FFFFFF",
      Main.STAGE_WIDTH / 2,
      325 - 133 + 15,
      "Time\n10.0"
    );
    this._textTime.textAlign = "center";
    this._textR = Util.addText(
      this,
      "40px " + Main.FONT_NAME,
      "#FF0000",
      (Main.STAGE_WIDTH >> 1) - 40,
      357 - 133 + 20,
      "100%"
    );
    this._textR.textAlign = "right";
    this._textG = Util.addText(
      this,
      "40px " + Main.FONT_NAME,
      "#00FF00",
      Main.STAGE_WIDTH >> 1,
      259 - 133 + 20,
      "100%",
      "center"
    );
    this._textB = Util.addText(
      this,
      "40px " + Main.FONT_NAME,
      "#0000FF",
      (Main.STAGE_WIDTH >> 1) + 40,
      357 - 133 + 20,
      "100%",
      "left"
    );
    this.containerScore = new createjs.Container();
    this.addChild(this.containerScore);
    this._textScore = Util.addText(
      this.containerScore,
      "32px " + Main.FONT_NAME,
      "#FFFFFF",
      80 - 32,
      443 - 133,
      "Score: 0",
      "center"
    );
    this.containerScore.x = Main.STAGE_WIDTH >> 1;
    this.containerScore.y = this._textScore.y;
    this._textScore.x = 0;
    this._textScore.y = -20;

    this._btnNext = new CcButton(187, 35, "Next Round");
    this._btnNext.x = Main.STAGE_WIDTH / 2;
    this._btnNext.y = 534 - 133;
    this._btnNext.addEventListener("click", (): void => {
      this.dispatchEvent("next", this);
    });
    this.addChild(this._btnNext);

    this._isPlaying = false;
  }

  public setData(data: ScoreData) {
    const col: ColorRGB = new ColorRGB();

    col.setUint(data.result);
    this._textResult.color = col.getRGBString();
    this._textResult.text = "Your Color " + col.getCode();

    col.setUint(data.target);
    this._textTarget.color = col.getRGBString();
    this._textTarget.text = "Target Color " + col.getCode();

    this._textR.text = String(data.r) + "%";
    this._textG.text = String(data.g) + "%";
    this._textB.text = String(data.b) + "%";

    this._textTime.text = "Time\n" + String(data.time.toFixed(1));
    this._textScore.text = "Score: " + String(data.total);

    this._textTarget.alpha = 0;
    this._textResult.alpha = 0;
    createjs.Tween.get(this._textTarget).to(
      { alpha: 1.0 },
      300,
      createjs.Ease.getPowOut(2)
    );
    createjs.Tween.get(this._textResult).to(
      { alpha: 1.0 },
      300,
      createjs.Ease.getPowOut(2)
    );

    this._textTime.alpha = 0;
    createjs.Tween.get(this._textTime)
      .wait(400)
      .to({ alpha: 1.0 }, 300, createjs.Ease.getPowOut(2));
    this._textR.alpha = 0;
    createjs.Tween.get(this._textR)
      .wait(500)
      .to({ alpha: 1.0 }, 300, createjs.Ease.getPowOut(2));
    this._textG.alpha = 0;
    createjs.Tween.get(this._textG)
      .wait(550)
      .to({ alpha: 1.0 }, 300, createjs.Ease.getPowOut(2));
    this._textB.alpha = 0;
    createjs.Tween.get(this._textB)
      .wait(600)
      .to({ alpha: 1.0 }, 300, createjs.Ease.getPowOut(2));

    this.r = 0;
    this.g = 0;
    this.b = 0;
    createjs.Tween.get(this)
      .wait(800)
      .set({ r: 0, g: 0, b: 0 })
      .to({ r: data.r, g: data.g, b: data.b }, 400)
      .call(this.onTick)
      .set({ _isPlaying: false });

    this.reticle.scaleX = 0.0;
    this.reticle.scaleY = 0.0;
    createjs.Tween.get(this.reticle)
      .wait(800)
      .to({ scaleX: 1.0, scaleY: 1.0 }, 400, createjs.Ease.getPowOut(2));

    this.containerScore.scaleX = 4.0;
    this.containerScore.scaleY = 4.0;
    this.containerScore.alpha = 0.0;
    createjs.Tween.get(this.containerScore)
      .wait(1300)
      .to({ scaleX: 1.0, scaleY: 1.0 }, 200, createjs.Ease.getBackOut(1));
    createjs.Tween.get(this.containerScore)
      .wait(1300)
      .to({ alpha: 1.0 }, 200, createjs.Ease.getPowOut(3));

    this._btnNext.scaleX = 0.0;
    this._btnNext.scaleY = 0.0;
    createjs.Tween.get(this._btnNext)
      .wait(1600)
      .to({ scaleX: 1.0, scaleY: 1.0 }, 300, createjs.Ease.getPowOut(5));

    this._isPlaying = true;
  }

  private onTick() {
    if (!this._isPlaying) {
      return;
    }
    this._textR.text = String(this.r | 0) + "%";
    this._textG.text = String(this.g | 0) + "%";
    this._textB.text = String(this.b | 0) + "%";
  }
}
