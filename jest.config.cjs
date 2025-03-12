module.exports = {
  preset: "ts-jest/presets/js-with-babel",
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/*.test.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^swiper/css$": "<rootDir>/src/__mocks__/swiper.js",
    "^swiper/css/(.*)$": "<rootDir>/src/__mocks__/swiper.js",
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
    "/node_modules/(?!(@babel/preset-react|react-icons|swiper|ssr-window|dom7)/)",
  ],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};
