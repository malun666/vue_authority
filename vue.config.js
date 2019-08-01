// vue.config.js
module.exports = {
  // css: {
  //   loaderOptions: {
  //     // 给 sass-loader 传递选项
  //     sass: {
  //       // @/ 是 src/ 的别名
  //       // 所以这里假设你有 `src/variables.scss` 这个文件
  //       // data: `@import "src/lib/hotcss/px2rem.scss";`
  //       data: '@import "src/assets/style/main.scss";'
  //     }
  //   }
  // }
  devServer: {
    proxy: {
      '/api': {
        //这里最好有一个 /
        target: 'http://192.168.1.130:8888', // 后台接口域名
        ws: true, //如果要代理 websockets，配置这个参数
        secure: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
};
