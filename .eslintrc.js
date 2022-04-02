module.exports = {
  root: true,
  extends: [
    'plugin:prettier/recommended',
    'prettier',
    'next',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['prettier', '@typescript-eslint', 'import'],
  rules: {
    '@next/next/no-img-element': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'import/extensions': [
      'warn',
      'never',
      {
        css: 'ignorePackages',
        json: 'ignorePackages',
        md: 'ignorePackages'
      }
    ],
    'import/default': 2,
    'import/export': 2,
    'import/namespace': 2,
    'import/named': 2,
    'import/newline-after-import': 2,
    'import/no-unresolved': [2, { commonjs: true, amd: true }],
    'import/no-extraneous-dependencies': 2,
    'import/no-anonymous-default-export': 0,
    'import/order': 'error',
    'react/no-unescaped-entities': 'off',
    'react/no-children-prop': 'off'
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json'
      }
    }
  }
}
