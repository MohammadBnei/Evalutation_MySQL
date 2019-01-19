module.exports = {
  root: true,
  env: {
    node: true
  },
  "extends": ["eslint:recommended", "plugin:node/recommended"],
  rules: {
    "node/exports-style": ["error", "module.exports"],
    "node/no-extraneous-require": "error",
    "no-console": "off"
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
