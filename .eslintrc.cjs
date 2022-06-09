module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'google',
  ],
  rules: {
    'linebreak-style': 0,
    'new-cap': 0,
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',

  },
};
