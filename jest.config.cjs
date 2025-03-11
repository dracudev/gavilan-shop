// filepath: jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/*.test.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "babel-jest",
      { configFile: "./babel.config.test.cjs" },
    ],
    "^.+\\.(js|jsx)$": [
      "babel-jest",
      { configFile: "./babel.config.test.cjs" },
    ],
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@babel/preset-react|react-icons)/)",
  ],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};
