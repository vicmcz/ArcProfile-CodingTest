module.exports = {
  customSyntax: 'postcss-less',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
  rules: {
    'no-descending-specificity': null,
    'function-url-quotes': 'always',
    'selector-attribute-quotes': 'always',
    'font-family-no-missing-generic-family-keyword': null,
    'plugin/declaration-block-no-ignored-properties': true,
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    // webcomponent
    'selector-type-no-unknown': null,
    'value-keyword-case': ['lower', { ignoreProperties: ['composes'] }],
    // 颜色
    'color-no-invalid-hex': true, // 禁止使用无效的十六进制颜色
    // 字体
    'font-family-no-duplicate-names': true, // 禁止使用重复的字体名称
    // 功能
    'function-calc-no-unspaced-operator': true, // 禁止在 calc 函数内使用不加空格的操作符
    // 字符串
    'string-quotes': 'single', // 指定字符串使用单引号
    'selector-class-pattern': null,
    'at-rule-no-vendor-prefix': null,
    'selector-pseudo-element-colon-notation': 'single',
    'alpha-value-notation': null, // 不按百分比来
    'color-function-notation': null, // 为适用的颜色功能指定现代或传统符号（可自动修复）。
    'at-rule-no-unknown': null,
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
};
