// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': ['babel-jest', { configFile: './.babelrc.json' }],
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
  transformIgnorePatterns: [],
  moduleDirectories: ['node_modules', 'src'],
  roots: ['<rootDir>/src', '<rootDir>/test'],
};
