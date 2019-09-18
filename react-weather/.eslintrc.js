module.exports = {
    parser: 'babel-eslint',
    extends: ['airbnb', 'prettier'],
    plugins: ['react', 'jsx-a11y', 'import'],
    rules: {
      'react/jsx-filename-extension': 0,
      'react/prop-types': 0,
      'global-require': 0
    }
  };