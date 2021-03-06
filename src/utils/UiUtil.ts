/**
 * @author ICS-Kawakatsu
 * @since  13/04/25
 */
export class UiUtil extends createjs.Container {
  static addText(
    parent: createjs.Container,
    font: string,
    color: string,
    xx: number,
    yy: number,
    text: string,
    textAlign: string = "center",
    textBaseline: string = "middle"
  ): createjs.Text {
    const tf: createjs.Text = new createjs.Text();
    tf.font = font;
    tf.color = color;
    parent.addChild(tf);
    tf.x = xx;
    tf.y = yy;
    tf.text = text;
    tf.textAlign = textAlign;
    tf.textBaseline = textBaseline;
    return tf;
  }

  static getRectShape(
    w: number,
    h: number,
    color: string,
    alpha: number
  ): createjs.Shape {
    const s: createjs.Shape = new createjs.Shape();
    s.graphics.beginFill(color);
    s.graphics.drawRect(0, 0, w, h);
    s.graphics.endFill();
    s.alpha = alpha;
    return s;
  }

  static getRoundRectShape(
    w: number,
    h: number,
    r: number,
    color: string,
    alpha: number
  ): createjs.Shape {
    const s: createjs.Shape = new createjs.Shape();
    s.graphics.beginFill(color);
    s.graphics.drawRoundRect(0, 0, w, h, r);
    s.graphics.endFill();
    s.alpha = alpha;
    return s;
  }
}
