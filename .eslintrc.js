module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "prettier",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "ignorePatterns": ["src/grammar.ts"],
  "rules": {
    "linebreak-style": [
      "error",
      "unix"
    ],
    "@typescript-eslint/ban-ts-comment": "off",
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ],
    "max-len": [
      "warn",
      {
        "code": 120
      }
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ]
  }
};
