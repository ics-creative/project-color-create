const {GenerateSW} = require('workbox-webpack-plugin');
const globToRegExp = require('glob-to-regexp');

module.exports = {
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: './src/Main.ts',
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/docs`,
    // 出力ファイル名
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: 'ts-loader'
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {url: false, minimize: true}},
        ],
      },
    ]
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    extensions: [
      '.ts', '.js', '.json'
    ],
  },

  plugins: [
    // サービスワーカーを定義
    new GenerateSW({
      importsDirectory: 'service-worker-assets',
      runtimeCaching: [
        {
          urlPattern: /\/$/,
          handler: 'networkFirst'
        },
        {
          urlPattern: /index.html$/,
          handler: 'networkFirst'
        },
        {
          urlPattern: /libs\/.*\.js/,
          handler: 'cacheFirst'
        }
      ],
    })
  ],

  devtool: 'source-map',

  // ローカル開発用環境を立ち上げる
  // 実行時にブラウザが自動的に localhost を開く
  devServer: {
    contentBase: 'docs',
//    open: true,
//    host: "0.0.0.0"
  }
};
