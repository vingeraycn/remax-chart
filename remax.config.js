const path = require('path');

module.exports = {
  one: true,
  output: 'dist/' + process.env.REMAX_PLATFORM,
  rootDir: 'example',
  configWebpack({ config, webpack, addCSSRule }) {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'))
  },
  pxToRpx: false
};
