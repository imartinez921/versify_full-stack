const path = require("path");

module.exports = {
    context: __dirname,
    entry: "./frontend/versify.jsx",
    output: {
        path: path.resolve(__dirname, "app", "assets", "javascripts"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/env", "@babel/react"],
                    },
                },
            },
        ],
    },
    devtool: "inline-source-map",
    resolve: {
        extensions: [".js", ".jsx", "*"],
        fallback: {
            "os": require.resolve("os-browserify/browser"),
            path: require.resolve("os-browserify"),
            crypto: require.resolve("crypto-browserify"),
            "buffer": require.resolve("buffer/"),
            "stream": require.resolve("stream-browserify"),
        },
    },
};
