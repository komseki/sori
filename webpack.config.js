const path = require('path');
const webpack = require('webpack');
const CONFIG = {
    context: path.resolve(__dirname, './src'),
    entry: {
        sori: ['babel-polyfill', './sori.js']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
    },
    module: {
        rules: [
            {
                test: /\.js$|\.html$/,
                exclude: /(node_modules|browser_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env', {modules: false}],
                            'stage-2'
                        ],
                        plugins: ['transform-runtime']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        // contentBase: false,
        index: './sample/index.html',
        watchContentBase: true,
        inline: true,
        hot: true,
        open: true,
        port: 8091
    },
    watch: true
}

module.exports = CONFIG;