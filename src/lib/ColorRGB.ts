/**
 *
 * @author ICS-Kawakatsu
 * @since  13/04/26
 */
export class ColorRGB {
  private _uint: number;
  private _code: string;
  private _rgbString: string;
  private _r: number;
  private _g: number;
  private _b: number;
  private static zero: string[] = [
    "なし",
    "00000",
    "0000",
    "000",
    "00",
    "0",
    ""
  ];

  constructor($uint: number = 0x0) {
    this._uint = $uint;
    this.setUint($uint);
  }

  public setUint(value: number): void {
    this.setData(value);
  }

  public getUint(): number {
    return this._uint;
  }

  public setCode(value: string): void {
    this.setData(parseInt(value.split("#")[1], 16));
  }

  public getCode(): string {
    return this._code;
  }

  public setRGBString(value: string): void {
    const arr: string[] = value
      .split("(")[1]
      .split(")")[0]
      .split(",");
    this.setData(
      (parseInt(arr[0]) << 16) | (parseInt(arr[1]) << 8) | parseInt(arr[2])
    );
  }

  public getRGBString(): string {
    return this._rgbString;
  }

  public setR(value: number): void {
    this.setData((value << 16) | (this._g << 8) | this._b);
  }

  public getR(): number {
    return this._r;
  }

  public setG(value: number): void {
    this.setData((this._r << 16) | (value << 8) | this._b);
  }

  public getG(): number {
    return this._g;
  }

  public setB(value: number): void {
    this.setData((this._r << 16) | (this._g << 8) | value);
  }

  public getB(): number {
    return this._b;
  }

  public setRGB(rValue: number, gValue: number, bValue: number): void {
    this.setData((rValue << 16) | (gValue << 8) | bValue);
  }

  public getRGB(): number[] {
    return [this._r, this._g, this._b];
  }

  private setData(uintStyle: number) {
    this._uint = uintStyle;

    this._r = (uintStyle >> 16) | 0;
    this._g = ((uintStyle & 0xff00) >> 8) | 0;
    this._b = (uintStyle & 0xff) | 0;

    let code: string = uintStyle.toString(16).toUpperCase();
    code = ColorRGB.zero[code.length] + code;
    this._code = "#" + code;
    this._rgbString = "rgb(" + this._r + "," + this._g + "," + this._b + ")";
  }

  public static RGBtoCMYK(uint: number): number[] {
    const col: ColorRGB = new ColorRGB(uint);
    const c: number = 1 - col.getR() / 0xff;
    const m: number = 1 - col.getG() / 0xff;
    const y: number = 1 - col.getB() / 0xff;
    const k: number = c > m ? (m > y ? y : m) : c > y ? y : c;
    const k1: number = 1 - k;
    return [(c - k) / k1, (m - k) / k1, (y - k) / k1, k];
  }
}
