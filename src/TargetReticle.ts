/**
 *
 * @author ICS-Kawakatsu
 * @since  13/04/25
 */
import { ColorRGB } from "./lib/ColorRGB";

export class TargetReticle extends createjs.Container {
  color: ColorRGB;
  shape: createjs.Shape;

  constructor() {
    super();

    this.shape = new createjs.Shape();
    this.addChild(this.shape);

    this.color = new ColorRGB();
  }

  drawReticle(col: number, min: number, c1: number, c2: number, max: number) {
    this.color.setUint(col);

    var g: createjs.Graphics = this.shape.graphics;

    var color: string = this.color.getRGBString();
    g.clear();
    this.drawStroke(g, color, min);
    this.drawStroke(g, color, c1);
    this.drawStroke(g, color, c2);
    this.drawStroke(g, color, max);

    var cos: number[] = [];
    var sin: number[] = [];
    var split: number = 3;
    for (var j = 0; j < split; j++) {
      var theta: number = -Math.PI / 2 + j * Math.PI * 2 / split;
      cos[j] = Math.cos(theta);
      sin[j] = Math.sin(theta);
    }

    var length: number = ((max - min + 3) / 6) | 0;
    for (var i = 0; i < length; i++) {
      for (var j = 0; j < split; j++) {
        var dc: number = 6 * cos[j] * i;
        var ds: number = 6 * sin[j] * i;
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
