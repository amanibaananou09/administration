const { defaults } = require("jest-config");

const config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverage: true,
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!(axios)/)"],
  setupFilesAfterEnv: ["./setupTests.js"],
  moduleDirectories: ["node_modules", "src"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/index.js",
    "!src/setupTests.ts",
    "!**/node_modules/**",
  ],
  coverageReporters: ["lcov", "text", "text-summary", "cobertura"],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    "mts",
    "cts",
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node",
  ],
  moduleNameMapper: {
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
  },
  testResultsProcessor: "jest-sonar-reporter",
};
module.exports = config;
