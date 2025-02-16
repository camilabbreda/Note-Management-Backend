module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFiles: ['dotenv/config'],
  testTimeout: 100000,
  setupFilesAfterEnv: ['./tests/setupTest/setupTest.ts'],
};
