import { CcButton } from "../../components/CcButton";
import { GameConfig } from "../../configs/GameConfig";
import { ScoreData } from "../../data/ScoreData";

import { Util } from "../../utils/Util";
import { View } from "../View";

/**
 * @author ICS-Kawakatsu
 * @since  13/05/07
 */
export class ResultView extends View {
  private _btnRetry: CcButton;
  private _btnTweet: CcButton;

  private _textTotal: createjs.Text;
  private isPlaying: boolean;
  private _totalScore: number;

  constructor($sceneId: string) {
    super($sceneId);
  }

  public init(): void {
    const scoreList: ScoreData[] = this.manager.datas[0] as ScoreData[];

    // const scoreList = [];
    // 		scoreList[0] = this.tests(1000, 0xFF, 0xFFFF);
    // 		scoreList[1] = this.tests(1001, 0xFF, 0xFFFF);
    // 		scoreList[2] = this.tests(1002, 0xFF, 0xFFFF);

    const textResult: createjs.Text = Util.addText(
      this,
      "36px " + GameConfig.FONT_NAME,
      "#FFFFFF",
      GameConfig.STAGE_WIDTH >> 1,
      166 - 133,
      "Result"
    );

    let str: string = "";
    let roundTotal: number = 0;
    const length: number = scoreList.length;
    const textList: createjs.Text[] = [];
    for (let i = 0; i < length; i++) {
      const score: ScoreData = scoreList[i];
      str += "Round" + (i + 1) + ": " + score.total + "\n";
      roundTotal += score.total;

      textList[i] = Util.addText(
        this,
        "24px " + GameConfig.FONT_NAME,
        "#FFFFFF",
        GameConfig.STAGE_WIDTH >> 1,
        234 - 133 + i * 32,
        "Round" + (i + 1) + " : " + score.total
      );
    }

    const textYour: createjs.Text = Util.addText(
      this,
      "36px " + GameConfig.FONT_NAME,
      "#FFFFFF",
      GameConfig.STAGE_WIDTH >> 1,
      356 - 133,
      "Your Score"
    );
    this._textTotal = Util.addText(
      this,
      "56px " + GameConfig.FONT_NAME,
      "#FFFFFF",
      GameConfig.STAGE_WIDTH >> 1,
      398 - 133,
      String(roundTotal)
    );

    this._btnTweet = new CcButton(187, 35, "Tweet");
    this._btnTweet.x = GameConfig.STAGE_WIDTH >> 1;
    this._btnTweet.y = 495 - 133;
    this._btnTweet.on("click", (): void => {
      const url: string =
        "https://twitter.com/?status=ColorCreate SCORE : " +
        roundTotal +
        " %23ColorCreate %23createjsjp";
      window.open(url);
    });

    this._btnTweet.visible = true;

    this._btnRetry = new CcButton(187, 35, "Retry");
    this._btnRetry.x = GameConfig.STAGE_WIDTH >> 1;
    this._btnRetry.y = 545 - 133;
    this.addChild(this._btnRetry);

    this._btnRetry.on("click", (): void => {
      this.dispatchEvent("retry", this);
    });

    textResult.alpha = 0;
    createjs.Tween.get(textResult)
      .wait(400)
      .to({ alpha: 1.0 }, 200, createjs.Ease.getPowOut(2));

    for (let i = 0; i < length; i++) {
      textList[i].alpha = 0;
      createjs.Tween.get(textList[i])
        .wait(800 + i * 350)
        .to({ alpha: 1.0 }, 200, createjs.Ease.getPowOut(2));
    }

    textYour.alpha = 0;
    createjs.Tween.get(textYour)
      .wait(2200)
      .to({ alpha: 1.0 }, 300, createjs.Ease.getPowOut(2));

    this._totalScore = 0;
    this._textTotal.alpha = 0;
    createjs.Tween.get(this._textTotal)
      .wait(2800)
      .to({ alpha: 1.0 }, 300, createjs.Ease.getPowOut(2));
    createjs.Tween.get(this)
      .wait(2900)
      .set({ r: 0, g: 0, b: 0 })
      .to({ _totalScore: roundTotal }, 400)
      .call(this.onTick)
      .set({ isPlaying: false });

    this._btnTweet.scaleX = 0.0;
    this._btnTweet.scaleY = 0.0;
    createjs.Tween.get(this._btnTweet)
      .wait(3600)
      .to({ scaleX: 1.0, scaleY: 1.0 }, 300, createjs.Ease.getPowOut(5));
    this._btnRetry.scaleX = 0.0;
    this._btnRetry.scaleY = 0.0;
    createjs.Tween.get(this._btnRetry)
      .wait(3600)
      .to({ scaleX: 1.0, scaleY: 1.0 }, 300, createjs.Ease.getPowOut(5));

    this.isPlaying = true;
  }

  private onTick() {
    if (!this.isPlaying) {
      return;
    }
    this._textTotal.text = String(Math.floor(this._totalScore));
  }

  //override
  dispose() {
    this._btnRetry.removeAllEventListeners("click");
    this._btnRetry.dispose();
    this._btnRetry = null;

    this._btnTweet.removeAllEventListeners("click");
    this._btnTweet.dispose();
    this._btnTweet = null;

    this.removeAllChildren();
  }
}
