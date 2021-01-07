const path = require('path')

module.exports = {
    entry: './src/index.js',
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
                                "modules": false,
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
        extensions: ["*", ".js", ".jsx"],
        fallback: {
            assert: require.resolve("assert/")
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
