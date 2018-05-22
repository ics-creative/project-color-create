import { ColorParticle } from "./ColorParticle";
import { ColorRect } from "./ColorRect";
import { ColorRGB } from "../../utils/ColorRGB";
import { Main } from "../../Main";
import { ResultCover } from "./ResultCover";
import { ScoreData } from "../../data/ScoreData";
import { TargetReticle } from "./TargetReticle";
import { TouchCircle } from "./TouchCircle";
import { Util } from "../../utils/Util";
import { View } from "../View";

/**
 * @author ICS-Kawakatsu
 * @since  13/05/07
 */
export class GameView extends View {
  private TIME_LIMIT: number = 10.0;
  private ROUND_MAX: number = 3;
  private thetaDelay: number;

  //system
  /*
	 * 0...カウントダウン中
	 * 1...受付中
	 * 2...操作中
	 * 3...結果表示中
	 */
  private state: number;
  private round: number;
  public scoreList: ScoreData[];

  //text
  private textTime: createjs.Text;
  private textRound: createjs.Text;
  private textStart: createjs.Text;
  private containerTextStart: createjs.Container;

  //game
  private currentTouchList: createjs.MouseEvent[];
  private usedCircles: TouchCircle[];
  private targetRect: ColorRect;
  private currentRect: ColorRect;
  private gp: TouchCircle;
  private reticle: TargetReticle;
  private cover: ResultCover;
  private startTime: number;
  private timeLeft: number;
  private theta: number;
  //

  //particle
  private centerPointX: number;
  private centerPointY: number;
  private particleRange: number;
  private gpParticle: ColorParticle;
  private currentParticleList: ColorParticle[];

  constructor($sceneId: string) {
    super($sceneId);
  }

  public init(): void {
    this.stage.on("stagemousedown", (event: createjs.MouseEvent) => {
      this.canvas_touchStartHandler(event);
    });

    this.stage.on("stagemousemove", (event: createjs.MouseEvent) => {
      this.canvas_touchMoveHandler(event);
    });

    this.stage.on("stagemouseup", (event: createjs.MouseEvent) => {
      this.canvas_touchEndHandler(event);
    });

    Util.addText(
      this,
      "20px " + Main.FONT_NAME,
      "#FFFFFF",
      85,
      180 - 133,
      "You"
    );
    Util.addText(
      this,
      "20px " + Main.FONT_NAME,
      "#FFFFFF",
      235,
      180 - 133,
      "Target"
    );
    this.textRound = Util.addText(
      this,
      "20px " + Main.FONT_NAME,
      "#FFFFFF",
      Main.STAGE_WIDTH / 2,
      147 - 133,
      "Round"
    );
    this.textTime = Util.addText(
      this,
      "32px " + Main.FONT_NAME,
      "#FFFFFF",
      Main.STAGE_WIDTH >> 1,
      173 - 133,
      String(this.TIME_LIMIT)
    );
    this.textTime.textAlign = "center";

    let rect: ColorRect = new ColorRect();
    rect.drawRect(0xffffff, 45);
    this.addChild(rect);
    rect.x = 224 + 45 - 32;
    rect.y = 215 + 45 - 133;
    this.targetRect = rect;

    rect = new ColorRect();
    rect.drawRect(0xffffff, 45);
    this.addChild(rect);
    rect.x = 74 + 45 - 32;
    rect.y = 215 + 45 - 133;
    this.currentRect = rect;

    this.reticle = new TargetReticle();
    this.addChild(this.reticle);
    this.reticle.visible = false;

    this.centerPointX = Main.STAGE_WIDTH >> 1;
    this.centerPointY =
      215 + 90 - 133 + ((Main.STAGE_HEIGHT - (215 + 90 - 133)) >> 1);
    this.particleRange = 150;
    this.thetaDelay = Math.PI * 2 / 3;

    this.usedCircles = [];
    this.currentParticleList = [];
    this.currentTouchList = [];
    const names: string[] = ["r", "g", "b"];
    const colors: number[] = [0xff0000, 0x00ff00, 0x0000ff];

    for (let i: number = 0; i < 3; i++) {
      const circle: TouchCircle = new TouchCircle(
        names[i],
        10,
        105,
        25,
        colors[i]
      );
      this.addChild(circle);
      circle.x = this.centerPointX;
      circle.y = this.centerPointY;
      this.usedCircles[i] = circle;

      let colorParticle = new ColorParticle();
      this.addChild(colorParticle);
      this.currentParticleList[i] = colorParticle;

      this.currentTouchList[i] = null;
    }

    const centerCircle: TouchCircle = new TouchCircle("", 5, 0, 0);
    centerCircle.drawCircle(0xffffff, 20);
    this.addChild(centerCircle);
    centerCircle.visible = false;
    this.gp = centerCircle;

    const cp = new ColorParticle();
    this.addChild(cp);
    this.gpParticle = cp;

    this.containerTextStart = new createjs.Container();
    this.addChild(this.containerTextStart);
    this.containerTextStart.x = Main.STAGE_WIDTH >> 1;
    this.containerTextStart.y = Main.STAGE_HEIGHT >> 1;
    this.textStart = Util.addText(
      this.containerTextStart,
      "50px " + Main.FONT_NAME,
      "#FFFFFF",
      0,
      -20,
      "Start"
    );

    this.cover = new ResultCover();
    this.cover.alpha = 0.0;
    this.addChild(this.cover);
    this.cover.on("next", (): void => {
      this.next();
    });

    this.round = this.ROUND_MAX;
    this.scoreList = [];

    this.theta = 0;
    this.start();

    createjs.Ticker.on("tick", this.onTick, this);
  }

  private onTick() {
    if (this.state == 0 || this.state == 1) {
      this.theta += 0.01;
      const length: number = this.currentTouchList.length;
      for (let i = 0; i < length; i++) {
        const circle: TouchCircle = this.usedCircles[i];
        if (this.currentTouchList[i] != null) {
          //ついてく
          circle.x +=
            ((this.currentTouchList[i].stageX - 0) / Main.SCALE - circle.x) *
            0.4;
          circle.y +=
            (this.currentTouchList[i].stageY / Main.SCALE - circle.y) * 0.4;
        } else {
          //くるくる
          const theta2: number = this.theta + i * this.thetaDelay;
          circle.x +=
            (this.centerPointX +
              this.particleRange * Math.cos(theta2) -
              circle.x) *
            0.01;
          circle.y +=
            (this.centerPointY +
              this.particleRange * Math.sin(theta2) -
              circle.y) *
            0.01;
        }
        this.currentParticleList[i].setData(
          circle.color.getUint(),
          circle.x,
          circle.y,
          25
        );
      }
    }

    if (this.state == 2) {
      this.timeLeft =
        this.TIME_LIMIT - (new Date().getTime() - this.startTime) / 1000;
      if (this.timeLeft <= 0) {
        this.timeLeft = 0;
        this.textTime.text = "0.0";
        this.end();
      } else {
        this.textTime.text = String(this.timeLeft.toFixed(1));
      }
    }
  }

  private canvas_touchStartHandler(event: createjs.MouseEvent) {
    if (this.state != 1) {
      return;
    }

    const circleLength: number = this.currentTouchList.length;

    const nx: number = (event.stageX - 0) / Main.SCALE;
    const ny: number = event.stageY / Main.SCALE;
    const rangeList: Distance[] = [];
    for (let i = 0; i < circleLength; i++) {
      if (this.currentTouchList[i] == null) {
        const targetCircle: TouchCircle = this.usedCircles[i];
        const dx: number = nx - targetCircle.x;
        const dy: number = ny - targetCircle.y;
        rangeList.push(new Distance(i, dx * dx + dy * dy));
      }
    }
    if (rangeList.length != 0) {
      //距離が一番短いものを使う
      rangeList.sort(Distance.sorter);
      this.currentTouchList[rangeList[0].i] = event;
    }

    //3つホードルドしてなければ抜ける
    for (let i = 0; i < circleLength; i++) {
      if (this.currentTouchList[i] == null) {
        return;
      }
    }

    //開始
    this.startHandle(event);
  }

  private startHandle(event: createjs.MouseEvent) {
    this.state = 2;
    this.startTime = new Date().getTime();

    const arr: createjs.MouseEvent[] = this.currentTouchList;

    let touch: createjs.MouseEvent;
    let circle: TouchCircle;

    const circleLength: number = this.currentTouchList.length;
    let xx: number = 0;
    let yy: number = 0;
    for (let j = 0; j < circleLength; j++) {
      touch = arr[j];
      xx += (touch.stageX - 0) / Main.SCALE;
      yy += touch.stageY / Main.SCALE;
    }
    xx /= circleLength;
    yy /= circleLength;

    console.log(xx, yy);
    this.gp.init(0, xx, yy);
    this.gp.visible = true;
    this.gpParticle.x = xx;
    this.gpParticle.y = yy;
    this.gpParticle.visible = true;

    for (let i: number = 0; i < circleLength; i++) {
      touch = arr[i];
      circle = this.usedCircles[i];
      circle.init(touch.pointerID, xx, yy);
      circle.drawCircle(0x0, 20);
    }
    this.canvas_touchMoveHandler(event);

    this.reticle.visible = true;
    this.reticle.drawReticle(0x666666, 25, 60, 100, 105);
    this.reticle.x = xx;
    this.reticle.y = yy;

    this.reticle.scaleX = 5;
    this.reticle.scaleY = 5;
    this.reticle.rotation = -180;

    createjs.Tween.get(this.reticle)
      .to({ scaleX: 1, scaleY: 1 }, 300, createjs.Ease.backOut)
      .wait(100)
      .to({ rotation: 0 }, 300, createjs.Ease.backOut);
  }

  private canvas_touchMoveHandler(event: createjs.MouseEvent) {
    const length3: number = this.currentTouchList.length;

    for (let l = 0; l < length3; l++) {
      if (
        this.currentTouchList[l] &&
        this.currentTouchList[l].pointerID == event.pointerID
      ) {
        this.currentTouchList[l] = event;
        break;
      }
    }

    if (this.state != 2) {
      return;
    }

    const col: ColorRGB = new ColorRGB();
    let touch: createjs.MouseEvent;
    let circle: TouchCircle;
    let circleLength: number = this.usedCircles.length;
    for (let j: number = 0; j < circleLength; j++) {
      circle = this.usedCircles[j];
      touch = this.currentTouchList[j];

      const percent: number = circle.getDPercent(
        (touch.stageX - 0) / Main.SCALE,
        touch.stageY / Main.SCALE
      );
      const colValue: number = (0xff * percent) | 0;
      let colUint: number;
      switch (circle.colorName) {
        case "r":
          col.setR(colValue);
          colUint = colValue << 16;
          break;
        case "g":
          col.setG(colValue);
          colUint = colValue << 8;
          break;
        case "b":
          col.setB(colValue);
          colUint = colValue;
          break;
        default:
          break;
      }
      circle.setData(
        colUint,
        15 + 15 * percent,
        (touch.stageX - 0) / Main.SCALE,
        touch.stageY / Main.SCALE,
        String(colValue)
      );
      this.currentParticleList[j].setData(
        circle.baseColor,
        circle.x,
        circle.y,
        30 + 50 * percent
      );
    }
    this.currentRect.drawRect(col.getUint(), 45);

    const targetColor: ColorRGB = this.targetRect.color;
    const resultColor: ColorRGB = this.currentRect.color;
    let t: number;
    let c: number;
    let pointScale: number;

    t = targetColor.getR();
    pointScale = 255 - t;
    pointScale = t > pointScale ? t : pointScale;
    c = resultColor.getR();
    let rP = ((1 - Math.abs(c - t) / pointScale) * 100) | 0;
    rP = rP < 0 ? 0 : rP;
    t = targetColor.getG();
    pointScale = 255 - t;
    pointScale = t > pointScale ? t : pointScale;
    c = resultColor.getG();
    let gP = ((1 - Math.abs(c - t) / pointScale) * 100) | 0;
    gP = gP < 0 ? 0 : gP;
    t = targetColor.getB();
    pointScale = 255 - t;
    pointScale = t > pointScale ? t : pointScale;
    c = resultColor.getB();
    let bP = ((1 - Math.abs(c - t) / pointScale) * 100) | 0;
    bP = bP < 0 ? 0 : bP;
    const perfect: number = (rP + gP + bP) / 300;

    this.gp.drawCircle(col.getUint(), 15 + perfect * 15);
    this.gpParticle.setOnlyColor(
      col.getUint(),
      10 + perfect * 30,
      20 + perfect * 30
    );
  }

  canvas_touchEndHandler(event: createjs.MouseEvent) {
    const length3: number = this.currentTouchList.length;

    for (let l = 0; l < length3; l++) {
      if (
        this.currentTouchList[l] &&
        this.currentTouchList[l].pointerID == event.pointerID
      ) {
        this.currentTouchList[l] = null;
        break;
      }
    }

    if (this.state != 2) {
      return;
    }

    let end: boolean = false;
    let circle: TouchCircle;
    const circleLength: number = this.usedCircles.length;
    for (let j: number = 0; j < circleLength; j++) {
      circle = this.usedCircles[j];
      if (event.pointerID == circle.identifier) {
        end = true;
        break;
      }
    }

    if (!end) {
      return;
    }
    //
    this.end();
  }

  private end(): void {
    //		const circle:TouchCircle;
    //		const circleLength:number = this.usedCircles.length;
    //		for (let j:number = 0; j < circleLength; j++) {
    //			circle = this.usedCircles[j];
    //		}
    this.state = 3;
    this.check();
  }

  private check(): void {
    let t: number;
    let c: number;
    let rP: number;
    let gP: number;
    let bP: number;
    const targetColor: ColorRGB = this.targetRect.color;
    const resultColor: ColorRGB = this.currentRect.color;
    let pointScale: number;

    t = targetColor.getR();
    pointScale = 255 - t;
    pointScale = t > pointScale ? t : pointScale;
    c = resultColor.getR();
    rP = ((1 - Math.abs(c - t) / pointScale) * 100) | 0;
    rP = rP < 0 ? 0 : rP;

    t = targetColor.getG();
    pointScale = 255 - t;
    pointScale = t > pointScale ? t : pointScale;
    c = resultColor.getG();
    gP = ((1 - Math.abs(c - t) / pointScale) * 100) | 0;
    gP = gP < 0 ? 0 : gP;

    t = targetColor.getB();
    pointScale = 255 - t;
    pointScale = t > pointScale ? t : pointScale;
    c = resultColor.getB();
    bP = ((1 - Math.abs(c - t) / pointScale) * 100) | 0;
    bP = bP < 0 ? 0 : bP;

    const score: number = (rP + gP + bP) / 3;
    const ss: number = score >> 2;
    const totalScore: number =
      ss * ss * ss * (100 + this.timeLeft * this.timeLeft) / 1000;

    const scoreData: ScoreData = new ScoreData();
    scoreData.time = this.timeLeft;
    scoreData.r = rP | 0;
    scoreData.g = gP | 0;
    scoreData.b = bP | 0;
    scoreData.average = score | 0;
    scoreData.total = Math.floor(totalScore);
    scoreData.target = targetColor.getUint();
    scoreData.result = resultColor.getUint();
    this.scoreList[this.ROUND_MAX - this.round] = scoreData;
    this.cover.setData(scoreData);

    this.cover.visible = true;
    this.cover.alpha = 0.0;
    createjs.Tween.get(this.cover).to(
      { alpha: 1.0 },
      300,
      createjs.Ease.getPowOut(2)
    );
  }

  private start(): void {
    this.gp.visible = false;
    this.gpParticle.visible = false;
    const circleLength: number = this.usedCircles.length;
    for (let j: number = 0; j < circleLength; j++) {
      this.usedCircles[j].initDraw(this.usedCircles[j].baseColor, 25);
    }
    this.reticle.visible = false;
    createjs.Tween.get(this.cover)
      .to({ alpha: 0.0 }, 300, createjs.Ease.getPowOut(2))
      .set({ visible: false });

    const rr: number = 20 + 235 * Math.random();
    const gg: number = 20 + 235 * Math.random();
    const bb: number = 20 + 235 * Math.random();
    this.targetRect.drawRect((rr << 16) | (gg << 8) | bb | 0, 45);
    //		this.targetRect.drawRect(0xFF<<(Math.random()*3|0)*8 | 0, 45);
    //		console.log(this.targetRect.color.getRGBString());
    this.currentRect.drawRect(0x0, 45);
    this.state = 0;

    this.textTime.text = "";
    this.textStart.text =
      "Round " + (this.ROUND_MAX - this.round + 1) + "\nStart!";

    this.textRound.text = "Round " + (this.ROUND_MAX - this.round + 1);

    this.containerTextStart.alpha = 0.0;
    this.containerTextStart.scaleX = 1.0;
    this.containerTextStart.scaleY = 1.0;
    createjs.Tween.get(this.containerTextStart)
      .wait(300)
      .to({ alpha: 1.0 }, 200)
      .wait(1000)
      .to(
        { alpha: 0.0, scaleX: 4.0, scaleY: 4.0 },
        300,
        createjs.Ease.getElasticInOut(2, 1)
      );
    createjs.Tween.get(this)
      .wait(1300)
      .set({ state: 1 });
  }

  next(): void {
    this.round--;
    if (this.round > 0) {
      this.start();
    } else {
      this.dispatchEvent("result", this);
    }
  }

  //override
  dispose() {
    this.stage.removeAllEventListeners("stagemousedown");
    this.stage.removeAllEventListeners("stagemousemove");
    this.stage.removeAllEventListeners("stagemouseup");

    this.targetRect = null;
    this.currentRect = null;

    this.reticle = null;

    this.gp = null;
    this.gpParticle = null;

    for (let i: number = 0; i < 3; i++) {
      const circle: TouchCircle = this.usedCircles[i];
      const colorParticle: ColorParticle = this.currentParticleList[i];
    }
    this.usedCircles = null;
    this.currentTouchList = null;
    this.currentParticleList = null;

    this.textTime = null;
    this.textStart = null;
    this.textRound = null;

    this.cover.removeAllEventListeners("next");
    this.cover = null;

    this.scoreList = null;

    this.removeAllChildren();
  }
}

class Distance {
  constructor(public i: number, public d: number) {}

  static sorter(a: Distance, b: Distance) {
    if (a.d < b.d) return -1;
    if (a.d > b.d) return 1;
    return 0;
  }
}
