// vue.config.js for less-loader@6.0.0
module.exports = {
    css: {
      loaderOptions: {
        less: {
          lessOptions: {
            modifyVars: {
              'primary-color': '#313131',
              'link-color': '#313131',
              'btn-border-radius-sm': '0px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  };