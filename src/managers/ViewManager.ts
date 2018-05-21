import { View } from "../view/View";

/**
 * @author ICS-Kawakatsu
 * @since  13/05/07
 */
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
    this.datas = $datas;

    let view: View;
    const length: number = this.viewList.length;
    for (let i = 0; i < length; i++) {
      if (this.viewList[i].sceneId == $sceneId) {
        view = this.viewList[i];
        break;
      }
    }
    if (view == null) {
      console.log("do not exist sceneId");
      return;
    }

    const tween: createjs.Tween = createjs.Tween.get(this, { paused: false });
    // const tween:createjs.Tween = createjs.Tween.get(this, {paused: true});
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
