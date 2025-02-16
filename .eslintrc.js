module.exports = {
  env: {
    commonjs: true,
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    semi: ['warn', 'always'],
    quotes: ['error', 'single'],
    indent: 'off',
    '@typescript-eslint/indent': 'off',
    'react/jsx-indent': 'off',
    'react/jsx-indent-props': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

  },
};
