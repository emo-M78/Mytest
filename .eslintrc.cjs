/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-prettier/skip-formatting'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    // CUSTOMIZATION: 您可以根据需要调整或添加 ESLint 规则
    rules: {
        'vue/multi-word-component-names': 'off', // 允许单字组件名 (例如 App.vue, Home.vue)
        'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }], // 对未使用的变量发出警告，但忽略以下划线开头的参数
        // 'vue/no-unused-vars': 'warn', // Vue模板中未使用的变量
        // 'prettier/prettier': ['warn', { // 与 Prettier 结合使用时的规则 (如果安装了 eslint-plugin-prettier)
        //   'singleQuote': true,
        //   'semi': true,
        //   'trailingComma': 'es5'
        // }],
    }
};