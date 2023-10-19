module.exports = {
  preset: 'react-native',
  coverageReporters: [['text', { skipFull: true }], 'html', 'lcov', 'json', 'clover'],
  coverageDirectory:'./coverage',
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/jest/setup.js'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)',
  ],
};