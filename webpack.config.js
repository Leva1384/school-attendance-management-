// const path = require('path');

// module.exports = {
//     mode: 'development',
//     entry: './index.js',
//     output: {
//       path: path.resolve(__dirname, 'dist'),
//       filename: 'bundle.js',
//     },
//     module: {
//       rules: [
//         {
//           test: /\.js$/,
//           exclude: /node_modules/,
//           use: 'babel-loader',
//         },
//       ],
//     },
//     resolve: {
//       extensions: ['.js'],
//     },
//     node: {
//       // This tells Webpack to ignore these Node.js core modules
//       fs: 'empty',       // Ignore 'fs' module
//       net: 'empty',      // Ignore 'net' module
//       tls: 'empty',      // Ignore 'tls' module
//       async_hooks: 'empty',  // Ignore 'async_hooks' module
//     },
//   };
// module.exports = {
//   target: "node",  // Ensures Webpack bundles for Node.js
//   externals: {
//     url: "commonjs url", // Use Node.js native 'url' module
//   },
// };
const path = require("path");

module.exports = {
  mode: "development", // or "production"
  target: "node", // Important for backend apps
  entry: "./index.js", // Change from './src/index.js' to './index.js'
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};

