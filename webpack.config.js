const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin}  = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = (env, argv) => {
    const devMode = argv.mode === 'development'

    return {
        entry: './resources/src/index.tsx',

        output: {
            filename: devMode ? '[name].js' : '[name].[contenthash].js',
            path: __dirname + '/public/js/',
            publicPath: 'js/'
        },

        devtool: /*devMode ? 'cheap-module-eval-source-map' :*/ 'source-map',

        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
            // plugins: [ new TsconfigPathsPlugin() ]
        },

        devServer: {
            port: 8080,
            historyApiFallback: true,
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    },
                },
                {
                    test: /\.(png|svg|ttf|woff2?|eot|webmanifest)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: devMode ? '[path][name].[ext]' : '[path][name].[hash:8].[ext]',
                            context: 'src/client/assets',
                        },
                    },
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                    query: {
                        interpolate: 'require',
                    },
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: false,
                                camelCase: true,
                                localIdentName: '[name]__[local]',
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                },
            ],
        },

        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: __dirname + '/resources/src/index.html',
                filename: __dirname + '/public/views/index.html',
            }),
            new ForkTsCheckerWebpackPlugin({
                workers: devMode ? 4 : 2,
                useTypescriptIncrementalApi: false
            }),
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].css' : '[name].[contenthash].css',
            }),
            new webpack.HashedModuleIdsPlugin(),
            new FriendlyErrorsWebpackPlugin(),
            new ManifestPlugin({ publicPath: 'js/'}),
        ],

        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true,
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        map: {
                            inline: false,
                            annotation: true,
                        },
                    },
                }),
            ],
        }   
    }
}
