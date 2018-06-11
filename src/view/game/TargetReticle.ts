/**
 * @author ICS-Kawakatsu
 * @since  13/04/25
 */
import { ColorRGB } from "../../utils/ColorRGB";

export class TargetReticle extends createjs.Container {
  private color: ColorRGB;
  private readonly shape: createjs.Shape;

  constructor() {
    super();

    this.shape = new createjs.Shape();
    this.addChild(this.shape);

    this.color = new ColorRGB();
  }

  public drawReticle(
    col: number,
    min: number,
    c1: number,
    c2: number,
    max: number
  ) {
    this.color.setUint(col);

    const g: createjs.Graphics = this.shape.graphics;

    const color: string = this.color.getRGBString();
    g.clear();
    this.drawStroke(g, color, min);
    this.drawStroke(g, color, c1);
    this.drawStroke(g, color, c2);
    this.drawStroke(g, color, max);

    const cos: number[] = [];
    const sin: number[] = [];
    const split: number = 3;
    for (let j = 0; j < split; j++) {
      const theta: number = -Math.PI / 2 + (j * Math.PI * 2) / split;
      cos[j] = Math.cos(theta);
      sin[j] = Math.sin(theta);
    }

    const length: number = ((max - min + 3) / 6) | 0;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < split; j++) {
        const dc: number = 6 * cos[j] * i;
        const ds: number = 6 * sin[j] * i;
        g.moveTo(min * cos[j] + dc, min * sin[j] + ds);
        g.lineTo(
          min * cos[j] + 3 * cos[j] + dc,
          min * sin[j] + 3 * sin[j] + ds
        );
      }
    }
  }

  private drawStroke(g: createjs.Graphics, col: string, r: number) {
    g.beginStroke(col);
    g.drawCircle(0, 0, r);
    g.endFill();
  }
}
