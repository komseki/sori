const path = require('path');
const webpack = require('webpack');
const CONFIG = {
    context: path.resolve(__dirname, './src'),
    entry: {
        sori: ['babel-polyfill', './Sori.js']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: path.resolve(__dirname, './dist'),
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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            foo : 123
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    devServer: {
        contentBase: './',
        watchContentBase: true,
        inline: true,
        hot: true,
        open: true,
        openPage: './sample/index.html',
        port: 8091
    },
    watch: false
}
process.env.NODE_ENV = JSON.parse('"development"');


module.exports = CONFIG;