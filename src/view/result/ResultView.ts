import { Main } from "../../Main";
import { ScoreData } from "../../data/ScoreData";

import { Util } from "../../utils/Util";
import { View } from "../View";

/**
 * @author ICS-Kawakatsu
 * @since  13/05/07
 */
export class ResultView extends View {
  public canvas: HTMLCanvasElement;
  public btnRetry: createjs.Container;
  public btnTweet: createjs.Container;

  private textTotal: createjs.Text;
  private play: boolean;
  private totalScore: number;

  constructor($sceneId: string) {
    super($sceneId);
  }

  private tests(total: number, target: number, result: number): ScoreData {
    const s: ScoreData = new ScoreData();
    s.total = total;
    s.target = target;
    s.result = result;
    return s;
  }

  public init(): void {
    const scoreList: ScoreData[] = <ScoreData[]>this.manager.datas[0];

    //		scoreList = [];
    //		scoreList[0] = this.tests(1000, 0xFF, 0xFFFF);
    //		scoreList[1] = this.tests(1001, 0xFF, 0xFFFF);
    //		scoreList[2] = this.tests(1002, 0xFF, 0xFFFF);

    this.canvas = <HTMLCanvasElement>document.getElementById("canv");

    const textResult: createjs.Text = Util.addText(
      this,
      "36px " + Main.FONT_NAME,
      "#FFFFFF",
      141 - 32,
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
        "24px " + Main.FONT_NAME,
        "#FFFFFF",
        116 - 32,
        234 - 133 + i * 32,
        "Round" + (i + 1) + ": " + score.total
      );
    }
    //		Util.addText(this, "24px " + Main.FONT_NAME, "#FFFFFF", 116 - 32, 234 - 133, str);

    const textYour: createjs.Text = Util.addText(
      this,
      "36px " + Main.FONT_NAME,
      "#FFFFFF",
      112 - 32,
      356 - 133,
      "Your Score"
    );
    this.textTotal = Util.addText(
      this,
      "56px " + Main.FONT_NAME,
      "#FFFFFF",
      Main.STAGE_WIDTH >> 1,
      398 - 133,
      String(roundTotal)
    );
    this.textTotal.textAlign = "center";

    let con: createjs.Container = new createjs.Container();
    this.addChild(con);
    let s: createjs.Shape = Util.getRoundRectShape(187, 35, 5, "#FFFFFF", 1);
    s.x = -93;
    s.y = -17;
    con.addChild(s);
    Util.addText(
      con,
      "24px " + Main.FONT_NAME,
      "#000000",
      0,
      -14,
      "Tweet"
    ).textAlign =
      "center";
    this.btnTweet = con;
    this.btnTweet.x = Main.STAGE_WIDTH >> 1;
    this.btnTweet.y = 495 - 133;
    this.btnTweet.on("click", (): void => {
      const url: string =
        "http://twitter.com/?status=ColorCreate SCORE : " +
        roundTotal +
        " %23ColorCreate %23createjsjp";
      window.open(url);
    });
    this.btnTweet.on("mousedown", (event: createjs.MouseEvent): void => {
      createjs.Tween.get(this.btnTweet, { override: true }).to(
        { alpha: 0.5 },
        250,
        createjs.Ease.cubicOut
      );
    });
    this.btnTweet.on("mouseup", (): void => {
      createjs.Tween.get(this.btnTweet, { override: true }).to(
        { alpha: 1.0 },
        250,
        createjs.Ease.cubicOut
      );
    });

    this.btnTweet.visible = false;

    con = new createjs.Container();
    this.addChild(con);
    s = Util.getRoundRectShape(187, 35, 5, "#FFFFFF", 1);
    s.x = -93;
    s.y = -17;
    con.addChild(s);
    Util.addText(
      con,
      "24px " + Main.FONT_NAME,
      "#000000",
      0,
      -14,
      "Retry"
    ).textAlign =
      "center";
    this.btnRetry = con;
    this.btnRetry.x = Main.STAGE_WIDTH >> 1;
    this.btnRetry.y = 545 - 133;
    this.btnRetry.on("click", (): void => {
      //
      this.dispatchEvent("retry", this);
    });
    this.btnRetry.on("mousedown", (event: createjs.MouseEvent): void => {
      createjs.Tween.get(this.btnRetry, { override: true }).to(
        { alpha: 0.5 },
        250,
        createjs.Ease.cubicOut
      );
    });

    this.btnRetry.on("mouseup", (): void => {
      createjs.Tween.get(this.btnRetry, { override: true }).to(
        { alpha: 1.0 },
        250,
        createjs.Ease.cubicOut
      );
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

    this.totalScore = 0;
    this.textTotal.alpha = 0;
    createjs.Tween.get(this.textTotal)
      .wait(2800)
      .to({ alpha: 1.0 }, 300, createjs.Ease.getPowOut(2));
    createjs.Tween.get(this)
      .wait(2900)
      .set({ r: 0, g: 0, b: 0 })
      .to({ totalScore: roundTotal }, 400)
      .call(this.onTick)
      .set({ play: false });

    this.btnTweet.scaleX = 0.0;
    this.btnTweet.scaleY = 0.0;
    createjs.Tween.get(this.btnTweet)
      .wait(3600)
      .to({ scaleX: 1.0, scaleY: 1.0 }, 300, createjs.Ease.getPowOut(5));
    this.btnRetry.scaleX = 0.0;
    this.btnRetry.scaleY = 0.0;
    createjs.Tween.get(this.btnRetry)
      .wait(3600)
      .to({ scaleX: 1.0, scaleY: 1.0 }, 300, createjs.Ease.getPowOut(5));

    this.play = true;
  }

  private onTick() {
    if (!this.play) {
      return;
    }
    this.textTotal.text = String(Math.floor(this.totalScore));
  }

  //override
  dispose() {
    this.btnRetry.removeAllEventListeners("click");
    this.btnRetry.removeAllEventListeners("mousedown");
    this.btnTweet.removeAllEventListeners("click");
    this.btnTweet.removeAllEventListeners("mousedown");

    this.btnRetry = null;
    this.btnTweet = null;

    this.removeAllChildren();
  }
}
