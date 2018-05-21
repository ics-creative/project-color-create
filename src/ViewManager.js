var ViewManager = (function () {
    function ViewManager() {
        this.viewList = [];
    }
    ViewManager.prototype.addView = function (view) {
        this.viewList.push(view);
        view.manager = this;
    };
    ViewManager.prototype.gotoView = function ($sceneId, $datas) {
        this.datas = $datas;
        var view;
        var length = this.viewList.length;
        for(var i = 0; i < length; i++) {
            if(this.viewList[i].sceneId == $sceneId) {
                view = this.viewList[i];
                break;
            }
        }
        if(view == null) {
            console.log("do not exist sceneId");
            return;
        }
        var tween = createjs.Tween.get(this, {
            paused: true
        });
        if(this.currentView != null) {
            tween.call(this.currentView.hide, null, this.currentView).wait(this.currentView.hideTime).call(this.currentView.dispose, null, this.currentView);
        }
        this.currentView = view;
        tween.call(this.currentView.init, null, this.currentView).call(this.currentView.show, null, this.currentView).wait(this.currentView.showTime);
        tween.setPaused(false);
    };
    return ViewManager;
})();
//@ sourceMappingURL=ViewManager.js.map
