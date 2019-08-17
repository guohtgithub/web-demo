module.exports = {
  lintOnSave: true,
  css: {
      loaderOptions: {
          postcss: {
              plugins: [
                  require('postcss-px2rem')(
                    {
                      remUnit: 16 // 换算的基数
                    }
                  ), 
              ]
          }
      }
  },
}