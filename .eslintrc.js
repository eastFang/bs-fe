module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  parser: 'babel-eslint',
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module",
    allowImportExportEverywhere: true,
  },
  "plugins": [
    "react",
  ],
  "rules": {
    "indent": [
      "error",
      "tab"
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    // "linebreak-style": ["error", "windows"],
    "dynamic": true
  },
  globals: {
    __dirname: true
  },
};