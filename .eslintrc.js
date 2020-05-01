module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import",
  ],
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "react/no-did-mount-set-state": [1],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prop-types": [1],
    "react/no-array-index-key": [1],
  }
};
