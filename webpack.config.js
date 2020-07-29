const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports={
    entry: './src/app/app.js',
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    node: {
        fs: "empty",
        net: 'empty'
    },
    plugins: [
        new HtmlwebpackPlugin({
        title: 'FaSol Moda Praia',
        hash: true,
        inject: false,
        appMountId: 'app',
        template: 'ejs!src/views/partials/header.ejs'}),
        new MiniCssExtractPlugin({filename: 'styles.css'})
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {presets: ['@babel/preset-env']}
                }
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-loader',
                options: {
                  variable: 'data',
                  interpolate : '\\{\\{(.+?)\\}\\}',
                  evaluate : '\\[\\[(.+?)\\]\\]'
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }
        ]
    }
}