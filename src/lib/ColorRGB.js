var ColorRGB = (function () {
    function ColorRGB($uint) {
        if (typeof $uint === "undefined") { $uint = 0x0; }
        this._uint = $uint;
        this.setUint($uint);
    }
    ColorRGB.zero = [
        "ãªã—", 
        "00000", 
        "0000", 
        "000", 
        "00", 
        "0", 
        ""
    ];
    ColorRGB.prototype.setUint = function (value) {
        this.setData(value);
    };
    ColorRGB.prototype.getUint = function () {
        return this._uint;
    };
    ColorRGB.prototype.setCode = function (value) {
        this.setData(parseInt(value.split("#")[1], 16));
    };
    ColorRGB.prototype.getCode = function () {
        return this._code;
    };
    ColorRGB.prototype.setRGBString = function (value) {
        var arr = value.split("(")[1].split(")")[0].split(",");
        this.setData(parseInt(arr[0]) << 16 | parseInt(arr[1]) << 8 | parseInt(arr[2]));
    };
    ColorRGB.prototype.getRGBString = function () {
        return this._rgbString;
    };
    ColorRGB.prototype.setR = function (value) {
        this.setData(value << 16 | this._g << 8 | this._b);
    };
    ColorRGB.prototype.getR = function () {
        return this._r;
    };
    ColorRGB.prototype.setG = function (value) {
        this.setData(this._r << 16 | value << 8 | this._b);
    };
    ColorRGB.prototype.getG = function () {
        return this._g;
    };
    ColorRGB.prototype.setB = function (value) {
        this.setData(this._r << 16 | this._g << 8 | value);
    };
    ColorRGB.prototype.getB = function () {
        return this._b;
    };
    ColorRGB.prototype.setRGB = function (rValue, gValue, bValue) {
        this.setData(rValue << 16 | gValue << 8 | bValue);
    };
    ColorRGB.prototype.getRGB = function () {
        return [
            this._r, 
            this._g, 
            this._b
        ];
    };
    ColorRGB.prototype.setData = function (uintStyle) {
        this._uint = uintStyle;
        this._r = uintStyle >> 16 | 0;
        this._g = (uintStyle & 0xFF00) >> 8 | 0;
        this._b = uintStyle & 0xFF | 0;
        var code = uintStyle.toString(16).toUpperCase();
        code = ColorRGB.zero[code.length] + code;
        this._code = "#" + code;
        this._rgbString = "rgb(" + this._r + "," + this._g + "," + this._b + ")";
    };
    ColorRGB.RGBtoCMYK = function RGBtoCMYK(uint) {
        var col = new ColorRGB(uint);
        var c = 1 - col.getR() / 0xFF;
        var m = 1 - col.getG() / 0xFF;
        var y = 1 - col.getB() / 0xFF;
        var k = c > m ? (m > y ? y : m) : (c > y ? y : c);
        var k1 = 1 - k;
        return [
            (c - k) / k1, 
            (m - k) / k1, 
            (y - k) / k1, 
            k
        ];
    };
    return ColorRGB;
})();
//@ sourceMappingURL=ColorRGB.js.map
