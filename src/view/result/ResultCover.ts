import { ColorRGB } from "../../lib/ColorRGB";

import { Main } from "../../Main";
import { ScoreData } from "../../data/ScoreData";
import { TargetReticle } from "../game/TargetReticle";
import { Util } from "../../utils/Util";

/**
 * @author ICS-Kawakatsu
 * @since  13/04/25
 */
export class ResultCover extends createjs.Container {
  private color: ColorRGB;
  private cover: createjs.Shape;
  private btnShape: createjs.Shape;
  private textResult: createjs.Text;
  private textTarget: createjs.Text;
  private textTime: createjs.Text;
  private textR: createjs.Text;
  private textG: createjs.Text;
  private textB: createjs.Text;
  private textScore: createjs.Text;

  private containerScore: createjs.Container;
  private containerButton: createjs.Container;

  private reticle: TargetReticle;
  private play: boolean;
  private r: number = 0;
  private g: number = 0;
  private b: number = 0;

  constructor() {
    super();

    this.color = new ColorRGB();

    this.cover = Util.getRectShape(
      Main.WIDTH * Main.SCALE,
      Main.HEIGHT,
      "#000000",
      0.8
    );
    this.cover.x = -Main.STAGE_OFFSET_X;
    this.addChild(this.cover);

    const reticle: TargetReticle = new TargetReticle();
    this.addChild(reticle);
    reticle.x = 155 + 37 - 32;
    reticle.y = 312 + 37 - 133;
    reticle.drawReticle(0x666666, 37, 37, 65, 65);
    this.reticle = reticle;

    this.textResult = Util.addText(
      this,
      "24px " + Main.FONT_NAME,
      "#FFFFFF",
      94 - 32,
      177 - 133,
      "Your Color #321869"
    );
    this.textTarget = Util.addText(
      this,
      "24px " + Main.FONT_NAME,
      "#FFFFFF",
      77 - 32,
      208 - 133,
      "Target Color #321869"
    );
    this.textTime = Util.addText(
      this,
      "20px " + Main.FONT_NAME,
      "#FFFFFF",
      Main.STAGE_WIDTH >> 1,
      325 - 133,
      "Time\n10.0"
    );
    this.textTime.textAlign = "center";
    this.textR = Util.addText(
      this,
      "40px " + Main.FONT_NAME,
      "#FF0000",
      (Main.STAGE_WIDTH >> 1) - 40,
      357 - 133,
      "100%"
    );
    this.textR.textAlign = "right";
    this.textG = Util.addText(
      this,
      "40px " + Main.FONT_NAME,
      "#00FF00",
      Main.STAGE_WIDTH >> 1,
      259 - 133,
      "100%"
    );
    this.textG.textAlign = "center";
    this.textB = Util.addText(
      this,
      "40px " + Main.FONT_NAME,
      "#0000FF",
      (Main.STAGE_WIDTH >> 1) + 40,
      357 - 133,
      "100%"
    );
    this.textB.textAlign = "left";
    this.containerScore = new createjs.Container();
    this.addChild(this.containerScore);
    this.textScore = Util.addText(
      this.containerScore,
      "44px " + Main.FONT_NAME,
      "#FFFFFF",
      80 - 32,
      443 - 133,
      "Score: 888888"
    );
    this.textScore.textAlign = "center";
    this.containerScore.x = Main.STAGE_WIDTH >> 1;
    this.containerScore.y = this.textScore.y;
    this.textScore.x = 0;
    this.textScore.y = -20;

    this.containerButton = new createjs.Container();
    this.addChild(this.containerButton);

    this.btnShape = Util.getRoundRectShape(187, 35, 5, "#FFFFFF", 1);
    this.containerButton.addChild(this.btnShape);
    this.btnShape.x = 104 - 32;
    this.btnShape.y = 534 - 133;
    this.btnShape.addEventListener("click", (): void => {
      //
      this.dispatchEvent("next", this);
    });
    this.btnShape.addEventListener(
      "mousedown",
      (event: createjs.MouseEvent): void => {
        createjs.Tween.get(this.btnShape, { override: true }).to(
          { alpha: 0.5 },
          250,
          createjs.Ease.cubicOut
        );

        event.addEventListener("mouseup", (): void => {
          createjs.Tween.get(this.btnShape, { override: true }).to(
            { alpha: 1.0 },
            250,
            createjs.Ease.cubicOut
          );

          event.removeAllEventListeners("mouseup");
        });
      }
    );

    const next: createjs.Text = Util.addText(
      this.containerButton,
      "24px " + Main.FONT_NAME,
      "#000000",
      144 - 32,
      537 - 133,
      "Next Round"
    );
    this.containerButton.x = Main.STAGE_WIDTH >> 1;
    this.containerButton.y = this.btnShape.y + 17;
    next.x -= Main.STAGE_WIDTH >> 1;
    next.y = -14;
    this.btnShape.x -= Main.STAGE_WIDTH >> 1;
    this.btnShape.y = -17;

    this.play = false;
  }

  public setData(data: ScoreData) {
    const col: ColorRGB = new ColorRGB();

    col.setUint(data.result);
    this.textResult.color = col.getRGBString();
    this.textResult.text = "Your Color " + col.getCode();

    col.setUint(data.target);
    this.textTarget.color = col.getRGBString();
    this.textTarget.text = "Target Color " + col.getCode();

    this.textR.text = String(data.r) + "%";
    this.textG.text = String(data.g) + "%";
    this.textB.text = String(data.b) + "%";

    this.textTime.text = "Time\n" + String(data.time.toFixed(1));
    this.textScore.text = "Score: " + String(data.total);

    this.textTarget.alpha = 0;
    this.textResult.alpha = 0;
    createjs.Tween.get(this.textTarget).to(
      { alpha: 1.0 },
      300,
      createjs.Ease.getPowOut(2)
    );
    createjs.Tween.get(this.textResult).to(
      { alpha: 1.0 },
      300,
      createjs.Ease.getPowOut(2)
    );

    this.textTime.alpha = 0;
    createjs.Tween.get(this.textTime)
      .wait(400)
      .to({ alpha: 1.0 }, 300, createjs.Ease.getPowOut(2));
    this.textR.alpha = 0;
    createjs.Tween.get(this.textR)
      .wait(500)
      .to({ alpha: 1.0 }, 300, createjs.Ease.getPowOut(2));
    this.textG.alpha = 0;
    createjs.Tween.get(this.textG)
      .wait(550)
      .to({ alpha: 1.0 }, 300, createjs.Ease.getPowOut(2));
    this.textB.alpha = 0;
    createjs.Tween.get(this.textB)
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
      .set({ play: false });

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

    this.containerButton.scaleX = 0.0;
    this.containerButton.scaleY = 0.0;
    createjs.Tween.get(this.containerButton)
      .wait(1600)
      .to({ scaleX: 1.0, scaleY: 1.0 }, 300, createjs.Ease.getPowOut(5));

    this.play = true;
  }

  private onTick() {
    if (!this.play) {
      return;
    }
    this.textR.text = String(this.r | 0) + "%";
    this.textG.text = String(this.g | 0) + "%";
    this.textB.text = String(this.b | 0) + "%";
  }
}
