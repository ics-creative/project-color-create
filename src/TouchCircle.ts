/**
 * Created with JetBrains WebStorm.
 * User: kawakatsu
 * Date: 13/04/25
 * Time: 13:42
 * To change this template use File | Settings | File Templates.
 */


class TouchCircle extends createjs.Container {
	initX:number;
	initY:number;
	dMin:number;
	dMax:number;
	dPercent:number;
	identifier:number;
	colorName:string;
	color:ColorRGB;
	shape:createjs.Shape;
	shape2:createjs.Shape;
	text:createjs.Text;
	line:createjs.Shape;
	baseColor:number;
	innerSize:number;

	constructor($colorName:string, $innerSize:number, $dMax:number, $dMin:number, $baseColor:number = 0x0) {
		super();
		this.colorName = $colorName;
		this.dMax = $dMax;
		this.dMin = $dMin;

		this.innerSize = $innerSize;

		this.line = new createjs.Shape();
		this.addChild(this.line);

		this.shape = new createjs.Shape();
		this.addChild(this.shape);
		this.shape2 = new createjs.Shape();
		this.addChild(this.shape2);

		this.baseColor = $baseColor;

		this.text = new createjs.Text();
		this.addChild(this.text);
		this.text.font = "40px Arial";
		this.text.color = new ColorRGB($baseColor).getRGBString();
		this.text.y = -150;

		this.color = new ColorRGB();

		this.shape.compositeOperation = "lighter";
		this.shape2.compositeOperation = "lighter";

		this.shape.alpha = 0.2;
	}

	init($identifier:number, $initX:number, $initY:number) {
		this.identifier = $identifier;

		this.initX = $initX;
		this.initY = $initY;

		this.x = this.initX;
		this.y = this.initY;

		this.line.graphics.clear();
	}

	initDraw(col:number, size:number) {
		this.line.graphics.clear();
		this.text.text = "";
		this.drawCircle(col, size);
	}

	drawCircle(col:number, size:number) {
		this.color.setUint(col);

		this.shape.graphics.clear();
		this.shape.graphics.beginFill(this.color.getRGBString());
		this.shape.graphics.drawCircle(0, 0, size);
		this.shape.graphics.endFill();

		this.shape2.graphics.clear();
		this.shape2.graphics.beginFill(this.color.getRGBString());
		this.shape2.graphics.drawCircle(0, 0, this.innerSize);
		this.shape2.graphics.endFill();
	}

	getDPercent(currentX:number, currentY:number):number {
		var dx:number = currentX - this.initX;
		var dy:number = currentY - this.initY;
		var percent = (Math.sqrt(dx * dx + dy * dy) - this.dMin) / (this.dMax - this.dMin);
		percent = percent < 0 ? 0 : percent;
		percent = percent > 1 ? 1 : percent;
		this.dPercent = percent;
		return this.dPercent;
	}

	setText(xx:number, yy:number, value:string):void {
		this.text.x = xx - this.initX;
		this.text.y = yy - this.initY;
		this.text.text = this.colorName + ":" + value;
	}

	setData(col:number, size:number, xx:number, yy:number, textValue:string) {
		this.color.setUint(col);

		this.shape.graphics.clear();
		this.shape.graphics.beginFill(this.color.getRGBString());
		this.shape.graphics.drawCircle(0, 0, size);
		this.shape.graphics.endFill();

		this.shape2.graphics.clear();
		this.shape2.graphics.beginFill(this.color.getRGBString());
		this.shape2.graphics.drawCircle(0, 0, this.innerSize);
		this.shape2.graphics.endFill();

		this.x = xx;
		this.y = yy;
//		this.text.text = this.colorName + ":" + textValue;

		var line:createjs.Shape = this.line;
		line.graphics.clear();
		line.graphics.beginStroke(new ColorRGB(this.baseColor).getRGBString());
		line.graphics.moveTo(this.initX - xx, this.initY - yy);
		line.graphics.lineTo(0, 0);
		line.graphics.endStroke();

		line.graphics.beginStroke(new ColorRGB(this.baseColor).getRGBString());
		line.graphics.drawCircle(0, 0, 50);
		line.graphics.endStroke();
	}

}