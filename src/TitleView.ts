import {Main} from './Main';
import {Util} from './Util';

/**
 * Created with JetBrains WebStorm.
 * User: kawakatsu
 * Date: 13/05/07
 * Time: 15:48
 * To change this template use File | Settings | File Templates.
 */
import {View} from './View';

export class TitleView extends View {
	public canvas:HTMLCanvasElement;
	public btnShape:createjs.Shape;

	constructor($sceneId:string) {
		super($sceneId);
	}

	init():void {
		this.canvas = <HTMLCanvasElement>document.getElementById("canv");

		this.btnShape = Util.getRoundRectShape(187, 35, 5, "#FFFFFF", 1);
		this.addChild(this.btnShape);
		this.btnShape.x = (Main.STAGE_WIDTH >> 1) - 93;
		this.btnShape.y = 495 - 133;
		this.btnShape.addEventListener("click", ():void => {
			this.dispatchEvent("start", this);
		});
		this.btnShape.addEventListener("mousedown", (event:createjs.MouseEvent):void => {
			createjs.Tween.get(this.btnShape, { override: true })
				.to({ alpha: 0.5 }, 250, createjs.Ease.cubicOut);

			event.addEventListener("mouseup", ():void => {
				createjs.Tween.get(this.btnShape, { override: true })
					.to({ alpha: 1.0 }, 250, createjs.Ease.cubicOut);

				event.removeAllEventListeners("mouseup");
			});
		});

		Util.addText(this, "48px " + Main.FONT_NAME, "#FFFFFF", Main.STAGE_WIDTH >> 1, 294 - 133, "Color Create").textAlign = "center";
		Util.addText(this, "18px " + Main.FONT_NAME, "#FFFFFF", Main.STAGE_WIDTH >> 1, 361 - 133, "powered by ICS INC.").textAlign = "center";
		Util.addText(this, "24px " + Main.FONT_NAME, "#000000", Main.STAGE_WIDTH >> 1, 498 - 133, "Start").textAlign = "center";

		console.log("hoge")
	}

//	onTick() {
//
//	}

	//override
	dispose() {
		this.btnShape.removeAllEventListeners("click");
		this.btnShape.removeAllEventListeners("mousedown");
		this.btnShape = null;

		this.removeAllChildren();
		this.removeAllChildren();
	}
}