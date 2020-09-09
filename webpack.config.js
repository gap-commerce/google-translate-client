const path = require("path");

module.exports = {
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "translator-observer.dist.js"
    },
    node: {
        child_process: "empty",
        fs: "empty",
        crypto: "empty",
        net: "empty",
        tls: "empty"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};
