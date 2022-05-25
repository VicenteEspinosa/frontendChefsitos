// import defaultConfig from './jest.config.js'
const defaultConfig = require('./jest.config')

module.exports = {
  ...defaultConfig,
  collectCoverage: true,
  collectCoverageFrom: ['./components/**', './pages/**'],
}
