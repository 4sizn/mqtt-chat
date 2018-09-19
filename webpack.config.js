const {resolve} = require('path')

module.exports ={
  devtool : 'source-map',
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, './dist'),
    publicPath: '/dist/js/'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              ["env", {
                "targets": {
                  "node": "current"
                }
              }],
            ],
            "plugins": [
              ["transform-object-rest-spread", {"useBuiltIns": true}],
              ["transform-class-properties", { "spec": true }]
            ]
          }
        },
        exclude: /node_modules/
      },
    ]
  },

  devServer:{
    port:3001,
    host:"127.0.0.1",
    contentBase:  resolve(__dirname, './view'),
    publicPath : '/dist/js'
  }
}