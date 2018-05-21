/**
 * Created with JetBrains WebStorm.
 * User: kawakatsu
 * Date: 13/04/25
 * Time: 13:42
 * To change this template use File | Settings | File Templates.
 */

/// <reference path="lib/easeljs.d.ts" />
/// <reference path="lib/ColorRGB.ts" />
/// <reference path="lib/ParticleEmitter.d.ts" />
class ColorParticle extends createjs.Container {
	static particleImage:HTMLImageElement;

	color:ColorRGB;
	emitter:createjs.ParticleEmitter;


	constructor() {
		super();
		//
		var emitter = new createjs.ParticleEmitter(ColorParticle.particleImage);
		emitter.position = new createjs.Point(0, 0);

		emitter.emitterType = createjs.ParticleEmitterType.Emit;
		emitter.emissionRate = 45;
		emitter.maxParticles = 100;
		emitter.life = 1000;
		emitter.lifeVar = 0;
		emitter.speed = 100;
		emitter.speedVar = 30;
		emitter.positionVarX = 10;
		emitter.positionVarY = 10;
		emitter.accelerationX = 0;
		emitter.accelerationY = 0;
		emitter.radialAcceleration = 0;
		emitter.radialAccelerationVar = 0;
		emitter.tangentalAcceleration = 0;
		emitter.tangentalAccelerationVar = 0;
		emitter.angle = 0;
		emitter.angleVar = 360;
		emitter.startSpin = 0;
		emitter.startSpinVar = 0;
		emitter.endSpin = null;
		emitter.endSpinVar = null;
		emitter.startColor = [200, 128, 255];
		emitter.startColorVar = [60, 25, 25];
		emitter.startOpacity = 1;
		emitter.endColor = null;
		emitter.endColorVar = null;
		emitter.endOpacity = null;
		emitter.startSize = 50;
		emitter.startSizeVar = 20;
		emitter.endSize = 0;
		emitter.endSizeVar = 10;

		this.addChild(emitter);
		this.emitter = emitter;

		this.color = new ColorRGB();
	}

	setData(col:number, xx:number, yy:number,speed:number) {
		this.color.setUint(col);

		this.emitter.startColor = this.color.getRGB();
		this.emitter.startColorVar = [25*4, 25*4, 25*4];
		this.emitter.position.x = xx;
		this.emitter.position.y = yy;
		this.emitter.speed = speed;
	}

	setOnlyColor(col:number,speed:number,size:number) {
		this.color.setUint(col);
		this.emitter.startColor = this.color.getRGB();
		this.emitter.startColorVar = [25, 25, 25];
		this.emitter.speed = speed;
		this.emitter.startSize = size;
	}
}