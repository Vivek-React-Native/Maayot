module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        "root": ["."],
        "alias": {
          "@adapters": "../../adapters",
          "@domains": "../../domains",
          "@frameworks": "../../frameworks",
          "@di": "./di",
          "@hooks": "./hooks",
          "@themes": "./themes",
          "@screens": "./screens",
          "@vm": "./vm"
        }
      }
    ]
  ]
};
