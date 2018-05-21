/**
 * Created with JetBrains WebStorm.
 * User: kawakatsu
 * Date: 13/05/07
 * Time: 15:57
 * To change this template use File | Settings | File Templates.
 */
import { View } from "./View";

export class ViewManager {
  public viewList: View[];
  public currentView: View;
  public datas: any[];

  constructor() {
    this.viewList = [];
  }

  public addView(view: View) {
    this.viewList.push(view);
    view.manager = this;
  }

  public gotoView($sceneId: string, $datas?: any[]): void {
    console.log("gotoView");
    this.datas = $datas;

    var view: View;
    var length: number = this.viewList.length;
    for (var i = 0; i < length; i++) {
      if (this.viewList[i].sceneId == $sceneId) {
        view = this.viewList[i];
        break;
      }
    }
    if (view == null) {
      console.log("do not exist sceneId");
      return;
    }

    var tween: createjs.Tween = createjs.Tween.get(this, { paused: false });
    // var tween:createjs.Tween = createjs.Tween.get(this, {paused: true});
    if (this.currentView != null) {
      //
      tween
        .call(this.currentView.hide, null, this.currentView)
        .wait(this.currentView.hideTime)
        .call(this.currentView.dispose, null, this.currentView);
    }
    this.currentView = view;
    tween
      .call(this.currentView.init, null, this.currentView)
      .call(this.currentView.show, null, this.currentView)
      .wait(this.currentView.showTime);

    // tween.setPaused(false);
  }
}
