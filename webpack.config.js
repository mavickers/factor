const path = require('path')

module.exports = {
    entry: './src/factor.js',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    "plugins": [
                        "@babel/plugin-proposal-class-properties",
                        "@babel/plugin-proposal-private-property-in-object",
                        "@babel/plugin-syntax-dynamic-import",
                        "@babel/plugin-transform-classes",
                        "@babel/plugin-transform-runtime",
                        "@babel/plugin-transform-template-literals"
                    ],
                    "presets": [
                        [
                            "@babel/preset-env",
                            {
                                "debug": false,
                                "modules": "auto",
                                "targets": {
                                    "browsers": ["> 1%", "last 2 versions", "ie >= 10"]
                                },
                                "useBuiltIns": "usage",
                                "corejs": 3
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.s?css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, ".", "src"),
        },
        extensions: ["*", ".js", ".jsx"],
        fallback: {
            assert: require.resolve("assert/"),
            process: require.resolve("process/")
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: '/dist/',
        filename: 'index.js',
        library: "mavickersFactor",
        libraryTarget: "umd"
    }
}
