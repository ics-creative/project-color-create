/**
 * Created with JetBrains WebStorm.
 * User: kawakatsu
 * Date: 13/04/25
 * Time: 13:42
 * To change this template use File | Settings | File Templates.
 */

/// <reference path="lib/easeljs.d.ts" />
/// <reference path="lib/ColorRGB.ts" />
class ColorRect extends createjs.Container {
	color:ColorRGB;
	shape:createjs.Shape;

	constructor() {
		super();

		this.shape = new createjs.Shape();
		this.addChild(this.shape);

		this.color = new ColorRGB();

		var s:createjs.Shape = new createjs.Shape();
		this.addChild(s);
		s.graphics.beginStroke("#666666");
		s.graphics.drawCircle(0, 0, 50);
		s.graphics.endFill();
	}

	drawRect(col:number, r:number) {
		this.color.setUint(col);

		this.shape.graphics.clear();
		this.shape.graphics.beginFill(this.color.getRGBString());
		this.shape.graphics.drawCircle(0, 0, r);
		this.shape.graphics.endFill();
	}

}