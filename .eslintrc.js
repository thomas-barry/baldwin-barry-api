module.exports = {
  extends: [
    'eslint-config-react'
  ],
  rules: {
    "semi": [1, 'never'],
    "indent": [1, 4],
    'eol-last': [1, 'always'],
    'arrow-parens': [1, 'as-needed'],
    'no-console': 1,
    'no-multiple-empty-lines': [1, { max: 1, maxEOF: 1 }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-indent': [1, 4, { checkAttributes: true, indentLogicalExpressions: true }],
    'no-trailing-spaces': 'error',
    'react/prop-types': [0],
    'comma-dangle': ['error', 'only-multiline']
  }
}
