// vue.config.js for less-loader@6.0.0

const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
<<<<<<< HEAD
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#E85A4F',
            'link-color': '#ec583a',
            'btn-border-radius-sm': '0px',
            'btn-border-radius-base': '0px',
            'card-radius': '10px',
=======
    css: {
      loaderOptions: {
        less: {
          lessOptions: {
            modifyVars: {
              'primary-color': '#E85A4F',
              'link-color': '#ec583a',
              'btn-border-radius-sm': '0px',
              //'btn-border-radius-base': '0px',还是有个圆角好看一点
              'card-radius': '10px',
            },
            javascriptEnabled: true,
>>>>>>> 733ee62b7ed8d57a8df68f0fbe8094d2b61a183c
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
  },
};