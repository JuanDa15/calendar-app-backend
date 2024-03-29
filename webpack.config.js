const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  target: 'node',
  resolve: {
    extensions: ['.js', '.json'], // Extensiones resolubles
  },
  externals: {
    'mongodb-client-encryption': 'commonjs mongodb-client-encryption',
    'aws4': 'commonjs aws4',
    'socks': 'commonjs socks',
    'snappy': 'commonjs snappy',
    'gcp-metadata': 'commonjs gcp-metadata',
    '@aws-sdk/credential-providers': 'commonjs @aws-sdk/credential-providers',
    '@mongodb-js/zstd': 'commonjs @mongodb-js/zstd',
    'kerberos': 'commonjs kerberos',
  },
  plugins: [
    // Ignora la advertencia específica en el build
    new webpack.IgnorePlugin({
      resourceRegExp: /the request of a dependency is an expression/,
    }),
  ],
  stats: {
    errorDetails: false, // Enable detailed error information
  },
};
