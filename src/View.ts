/**
 * Created with JetBrains WebStorm.
 * User: kawakatsu
 * Date: 13/05/07
 * Time: 15:48
 * To change this template use File | Settings | File Templates.
 */
import {ViewManager} from './ViewManager';

export class View extends createjs.Container {
	// public stage:createjs.Stage;
	public sceneId:string;
	public showTime:number = 300;
	public hideTime:number = 300;
	public manager:ViewManager;

	constructor($sceneId:string) {
		super();
		this.sceneId = $sceneId;
	}

	public addToStage($stage:createjs.Stage) {
		console.log("addToStage")
		// this.stage = $stage;
		// this.stage.addChild(this);
    $stage.addChild(this);
	}

	public init():void {
	}

	public show():void {
		this.alpha = 0.0;
		createjs.Tween.get(this).to({alpha: 1.0}, this.showTime, createjs.Ease.getPowOut(2));
		this.visible = true;
	}

	public hide():void {
		this.alpha = 1.0;
		createjs.Tween.get(this).to({alpha: 0.0}, this.showTime, createjs.Ease.getPowOut(2)).set({visible: false});
		this.visible = true;
	}

	public dispose():void {
	}

}