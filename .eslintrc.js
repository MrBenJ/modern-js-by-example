const path = require('path');

module.exports = {
  "parser": "babel-eslint",
  "plugins": [
    "react",
    "css-modules",
    "babel",
    "flowtype",
    "jest"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "settings": {
    "flowtype": {
      "onlyFilesWithFlowAnnotation": true
    },
    "import/resolver": {
      "webpack": {
        "config": "webpack.config.js"
      },
      "node": {
        "extensions": [
          ".js"
        ]
      }
    }
  },
  "root": true,
  "env": {
    "browser": true,
    "node": true,
    "jest": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "jsx": true
    }
  },

  "rules": {
    "no-console": 1,
    "flowtype/require-valid-file-annotation": [
      2,
      "always"
    ],
    "flowtype/define-flow-type": 1,
    "flowtype/use-flow-type": 1,
    "react/prop-types": 0
  }
}
