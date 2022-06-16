let neutrino = require('neutrino');

const webpack = neutrino().webpack();

webpack.resolve.modules = [];

webpack.resolve.modules.push('node_modules');
webpack.resolve.modules.push('src');

module.exports = webpack;