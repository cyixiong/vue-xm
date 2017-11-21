//导入nodejs的path这个核心包
 var path = require('path');
//导入html-webpack-plugin
var htmlwp = require('html-webpack-plugin');
 module.exports ={
   //指定webpack的打包的入口文件
   entry:'./src/main.js',
   //输出文件
   output:{
     path:path.join(__dirname,"/dist"),
     filename:"build.js"
   },
  //  配置webpack相对与的loader包
  module:{
    //在这里配置的是哭啼的某一个的loader
    loaders:[
      {
        test:/\.css$/,
        loader:'style-loader!css-loader'
      }, {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      }, {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }, {
        test: /\.(png|jpg|gif|woff|ttf)$/,
        loader: 'url-loader?limit=10240'
      }, {
        test: /\.js$/,//  用正则匹配当前访问的文件的后缀名是.js
        loader: 'babel-loader',
        //node_modules文件夹的所有，js文件应该排除
        exclude:/node_modules/
      }, 
      //配置的是用来解析.vue文件的loader(vue-loader)
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  //webpack需要使用的插件配置在这里
  plugins:[
    new htmlwp({
      filename:'index.html',//内存中生成的html的文件名称
      //通过script标签加载到index.html的底部
      template:'index1.html'
    })
  ]
 }