/**
 * Created with JetBrains WebStorm.
 * User: kawakatsu
 * Date: 13/04/25
 * Time: 11:44
 * To change this template use File | Settings | File Templates.
 */


	export class ParticleEmitter extends createjs.DisplayObject {
		constructor(image:any);

		emitterType:number;
		emissionRate:number;
		maxParticles:number;
		life:number;
		lifeVar:number;
		speed:number;
		speedVar:number;
		positionVarX:number;
		positionVarY:number;
		accelerationX:number;
		accelerationY:number;
		radialAcceleration:number;
		radialAccelerationVar:number;
		tangentalAcceleration:number;
		tangentalAccelerationVar:number;
		angle:number;
		angleVar:number;
		startSpin:number;
		startSpinVar:number;
		endSpin:number;
		endSpinVar:number;
		startColor:number[];
		startColorVar:number[];
		startOpacity:number;
		endColor:number[];
		endColorVar:number[];
		endOpacity:number;
		startSize:number;
		startSizeVar:number;
		endSize:number;
		endSizeVar:number;
		position:createjs.Point;
	}

	export class ParticleEmitterType {
		static Emit:number;
		static OneShot:number;
	}
