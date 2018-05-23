var path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './demo/router/main.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'demo/router'),
    filename: "compiled.js"
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }]
  },
  plugins: [new VueLoaderPlugin()]
}
