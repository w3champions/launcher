module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  moduleFileExtensions: [
    "js",
    "ts",
    "json",
    "vue"
  ],
  transform: {
    ".*\\.(vue)$": "@vue/vue3-jest",
    "^.+\\.(ts)$": "ts-jest",

  },
  collectCoverage: true,
  collectCoverageFrom: ["**/*.{ts,vue}", "!**/node_modules/**"]
};
