/* eslint-disable filenames/match-exported */
let neutrino = require('neutrino');

const config = neutrino().eslintrc();

config.settings['import/resolver'].node.paths = ['src'];

module.exports = config;

/* eslint-enable filenames/match-exported */