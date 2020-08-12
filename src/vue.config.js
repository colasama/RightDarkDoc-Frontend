// vue.config.js for less-loader@6.0.0
module.exports = {
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
          },
        },
      },
    },
  };