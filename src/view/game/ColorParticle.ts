import { ColorData, ParticleSystem } from "particlejs";
import { ColorRGB } from "../../utils/ColorRGB";

/**
 * @author ICS-Kawakatsu
 * @since  13/04/25
 */
export class ColorParticle extends createjs.Container {
  private color: ColorRGB;
  private particleSystem: ParticleSystem;

  constructor() {
    super();

    // パーティクルシステム作成します。
    const particleSystem = new ParticleSystem();

    // パーティクルシステムの描画コンテナーを表示リストに登録します。
    this.addChild(particleSystem.container);
    this.particleSystem = particleSystem;

    // Particle Develop( http://ics-web.jp/projects/particle-develop/ ) から書きだしたパーティクルの設定を読み込む
    particleSystem.importFromJson(
      // パラメーターJSONのコピー＆ペースト ここから--
      {
        bgColor: "#00000",
        width: 1473,
        height: 824,
        emitFrequency: 40,
        startX: 0,
        startXVariance: 0,
        startY: 0,
        startYVariance: 0,
        initialDirection: 87,
        initialDirectionVariance: 360,
        initialSpeed: 3,
        initialSpeedVariance: 5.6,
        friction: 0.0315,
        accelerationSpeed: 0,
        accelerationDirection: 0,
        startScale: 1,
        startScaleVariance: 0.52,
        finishScale: 0,
        finishScaleVariance: "0",
        lifeSpan: 30,
        lifeSpanVariance: "0",
        startAlpha: "1",
        startAlphaVariance: "0",
        finishAlpha: "1",
        finishAlphaVariance: "0",
        shapeIdList: ["blur_circle"],
        startColor: {
          hue: "17",
          hueVariance: 32,
          saturation: "100",
          saturationVariance: "45",
          luminance: "56",
          luminanceVariance: "19"
        },
        blendMode: true,
        alphaCurveType: "0",
        VERSION: "1.0.0"
      }
      // パラメーターJSONのコピー＆ペースト ここまで---
    );
    this.color = new ColorRGB();

    this.on("tick", this.onTick, this);
  }

  onTick() {
    // パーティクルの発生・更新
    this.particleSystem.update();
  }

  setData(col: number, xx: number, yy: number, speed: number) {
    this.color.setUint(col);

    const rgbArr = this.color.getRGB();
    const hslArr = rgbToHsl(rgbArr[0], rgbArr[1], rgbArr[2]);

    const data = new ColorData();
    data.hue = hslArr[0] * 360;
    data.saturation = hslArr[1] * 100;
    data.luminance = hslArr[2] * 100;

    data.saturationVariance = 45;
    data.luminanceVariance = 19;
    data.hueVariance = 21;

    this.particleSystem.startColor = data;
    this.particleSystem.startX = xx;
    this.particleSystem.startY = yy;

    this.particleSystem.initialSpeed = speed / 10;
  }

  setOnlyColor(col: number, speed: number, size: number) {
    this.color.setUint(col);
    const rgbArr = this.color.getRGB();
    const hslArr = rgbToHsl(rgbArr[0], rgbArr[1], rgbArr[2]);

    const data = new ColorData();
    data.hue = hslArr[0] * 360;
    data.saturation = hslArr[1] * 100;
    data.luminance = hslArr[2] * 100;

    this.particleSystem.startColor = data;
    this.particleSystem.initialSpeed = speed / 10;
    this.particleSystem.startScale = size / 100;
  }
}

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgbToHsl(r: number, g: number, b: number): number[] {
  (r /= 255), (g /= 255), (b /= 255);

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [h, s, l];
}
