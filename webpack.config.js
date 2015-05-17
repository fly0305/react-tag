var webpack = require('webpack');

module.exports = {
    entry: "./lib/reactTags.js",
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    externals: {
        'react': 'React',
        'react-dnd': 'ReactDND'
    },
    output: {
        filename: "dist/ReactTags.min.js",
        libraryTarget: 'umd',
        library: 'ReactTags'
    }
};
