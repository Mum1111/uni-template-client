module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  globals: {
    uni: "readonly",
    plus: "readonly",
    wx: "readonly",
  },
  parser: "vue-eslint-parser",
  // parser: "babel-eslint",
  plugins: ["vue", "prettier"],
  extends: ["plugin:vue/vue3-essential", "plugin:prettier/recommended", "airbnb-base"],
  parserOptions: {
    // ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    // 自己写一些想配置的规则
    "max-len": 0,
    "indent": 0,
    "quotes": 0,
    "quote-props": 0,
    "comma-dangle": 0,
    "linebreak-style": 0,
    "semi": 0,
    "no-alert": 2,
    "no-trailing-spaces": 1,
    "vue/multi-word-component-names": 0,
    "func-names": 0,
    "object-shorthand": 0,
    "import/prefer-default-export": 0,
    "import/no-extraneous-dependencies": 0,
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto",
      },
    ],

    "spaced-comment": 0,
    "class-methods-use-this": 0,
    "prefer-object-spread": 0,
    "object-curly-newline": 0,
    "prefer-template": 0,
  },
}
