const webpack = require("./node_modules/webpack");

const config = {
  mode: "none",
  entry: {
    main: "./js/main.js"
  },
  watch: true,
  output: {
    path: __dirname,
    publicPath: '/bundles/applicationcamusassets/js/bundle/',
    chunkFilename: '[name]Chunk.js',
    filename: "./[name]bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!(share-this|react-scroll-listener|yt-player)\/).*/,
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      },
      {
        test: /vendor\/.+\.(jsx|js)$/,
        loader: "imports?jQuery=jquery,$=jquery,this=>window"
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.jsx', '.js']
  },
  node: {
    fs: "empty"
  }
};

module.exports = config;
