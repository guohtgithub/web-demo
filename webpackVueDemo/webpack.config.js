/**
 * webpack 默认不支持转码es6 但是import export 这两个语法单独支持
 */

let path = require('path')
let webpack = require('webpack')
let VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry:['babel-polyfill','./src/main.js'],
  output:{
    path:path.resolve(__dirname,'./dist'),
    publicPath:'/dist/',
    filename:'build.js'
  },
  devServer:{
    historyApiFallback:true,
    overlay:true
  },
  resolve:{
    alias:{
      'vue$':'vue/dist/vue.esm.js'
    }
  },
  plugins:[
    new VueLoaderPlugin()
  ],
  module:{
    rules:[
      // vue css 
      {
        test:/\.css$/,
        use:[
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      // .scss css
      {
        test:/\.scss$/,
        use:[
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      // .sass css
      {
        test:/\.sass$/,
        use:[
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ]
      },
      // babel-loader 转码 es6 
      {
        test:/\.js$/,
        loader:'babel-loader',
        exclude:'/node_modules/'
      },
      // 图片
      {
        test:/\.(png|jpg|gif|svg)$/,
        loader:'file-loader',
        options:{
          name:'[name].[ext]?[hash]'
        }
      },
      // .vue loader
      {
        test:/\.vue$/,
        loader:'vue-loader',
        options:{
          loaders:{
            'scss':[
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass':[
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
        }
      }
    ]

  },
  devtool:'#eval-source-map'
}