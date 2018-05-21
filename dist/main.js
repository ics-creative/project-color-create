/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/// <reference path=\"lib/easeljs.d.ts\" />\n/// <reference path=\"lib/tweenjs.d.ts\" />\n/// <reference path=\"lib/Stats.ts\" />\n/// <reference path=\"ViewManager.ts\" />\n/// <reference path=\"TitleView.ts\" />\n/// <reference path=\"GameView.ts\" />\n/// <reference path=\"ResultView.ts\" />\nvar Main = /** @class */ (function () {\n    function Main() {\n        var _this = this;\n        this.canvas = document.getElementById(\"canv\");\n        this.stage = new createjs.Stage(this.canvas);\n        Main.SCALE = this.canvas.height / Main.HEIGHT;\n        Main.WIDTH = this.canvas.width / Main.SCALE;\n        this.stage.scaleX = Main.SCALE;\n        this.stage.scaleY = Main.SCALE;\n        Main.STAGE_OFFSET_X = (this.canvas.width - Main.STAGE_WIDTH * Main.SCALE) >> 1;\n        this.stage.x = Main.STAGE_OFFSET_X;\n        //\t\tthis.stats = new Stats();\n        //\t\t(<HTMLDivElement>document.getElementById(\"stats\")).appendChild(this.stats.domElement);\n        createjs.Ticker.setFPS(60);\n        createjs.Ticker.addListener(this);\n        this.stage.enableMouseOver(60);\n        if (createjs.Touch.isSupported()) {\n            createjs.Touch.enable(this.stage);\n        }\n        this.manager = new ViewManager();\n        var titleView = new TitleView(\"title\");\n        titleView.addToStage(this.stage);\n        this.manager.addView(titleView);\n        titleView.addEventListener(\"start\", function () {\n            _this.manager.gotoView(\"game\");\n        });\n        var gameView = new GameView(\"game\");\n        gameView.addToStage(this.stage);\n        this.manager.addView(gameView);\n        gameView.addEventListener(\"result\", function (event) {\n            _this.manager.gotoView(\"result\", [event.target.scoreList]);\n        });\n        var resultView = new ResultView(\"result\");\n        resultView.addToStage(this.stage);\n        this.manager.addView(resultView);\n        resultView.addEventListener(\"retry\", function () {\n            _this.manager.gotoView(\"game\");\n        });\n        this.manager.gotoView(\"title\");\n        //\t\tthis.manager.gotoView(\"result\",[gameView.scoreList]);\n    }\n    Main.main = function () {\n        //alert(\"Hello World!\");\n        ColorParticle.particleImage = new Image();\n        ColorParticle.particleImage.onload = assetLoadComplete;\n        ColorParticle.particleImage.src = \"images/particle_base.png\";\n    };\n    Main.assetLoadComplete = function () {\n        new Main();\n    };\n    Main.prototype.tick = function () {\n        this.stage.update();\n        //\t\tthis.stats.update();\n    };\n    Main.FONT_NAME = \"Impact\";\n    Main.STAGE_WIDTH = 320;\n    Main.STAGE_HEIGHT = 480;\n    Main.WIDTH = Main.STAGE_WIDTH;\n    Main.HEIGHT = Main.STAGE_HEIGHT;\n    Main.STAGE_OFFSET_X = 0;\n    return Main;\n}());\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ })

/******/ });