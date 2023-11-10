/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const { getDefaultConfig } = require("metro-config")
const path = require('path')
const extraNodeModules = {
  '@adapters': path.resolve(__dirname + '/../../adapters'),
  '@domains': path.resolve(__dirname + '/../../domains'),
  '@frameworks': path.resolve(__dirname + '/../../frameworks'),
}
const watchFolders = [
  path.resolve(__dirname + '/../../adapters'),
  path.resolve(__dirname + '/../../domains'),
  path.resolve(__dirname + '/../../frameworks'),
]

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig()

  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"],
      extraNodeModules: new Proxy(extraNodeModules, {
        get: (target, name) =>
          name in target ? target[name] : path.join(process.cwd(), `node_modules/${name}`),
      }),
    },
    watchFolders,
  }
})()