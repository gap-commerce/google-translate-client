const path = require("path");

module.exports = {
    mode: 'development',
    optimization: {
        // We no not want to minimize our code.
        minimize: false
    },
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "translator-observer.dist.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            }
        ]
    }
};