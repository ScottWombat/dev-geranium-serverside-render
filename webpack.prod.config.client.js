const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin')
const extractCSS = new ExtractTextPlugin({
    filename: '[name]_[hash:8].bundle.css',
   
});

require('dotenv').config();

module.exports = [
	{
		name: 'Wild Geranium',
		target: 'node',
		entry: {
            app : ['./src/client/browser.js']
            
        },
        output: {
            path: path.join(__dirname, './build'),
            filename: "[name]_[hash:8].bundle.js",
            publicPath: '/static'
		},
       optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					chunks: "initial",
					minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 0 // This is example is too small to create commons chunks
				},
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 10,
					enforce: true
				}
			}
		}
	},
        performance: {
            hints: false
        },
		resolve: {
            modules: [path.resolve(), 'node_modules', 'src'],
			extensions: ['.js', '.jsx']
		},
        devtool: 'source-map',
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /(node_modules\/)/,
					use: [
						{
							loader: 'babel-loader',
						}
					]
				},
                {//regular css files
                        test: /\.css$/,
                        use: extractCSS.extract({
                            fallback: 'style-loader',
                            use: [
                                 {loader: 'css-loader'},
                                 {loader: 'postcss-loader',
                                            options: {
                                                plugins: (loader) => [
                                                    require('autoprefixer')({browsers: ['last 2 versions','last 2 Chrome versions','ie >= 10','Firefox > 20','safari 5','safari 5']}),
                                                ]
                                            }
                                 }
                            ]
                        })
                },
                {
                test: /\.(jpg|png|gif|pdf|ico)$/,
                use: [
                    {
                        loader: 'url-loader'
                    },
                ]
                },
                {
                test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                }]
                },
                {
                test: /\.(svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                    }
                ]
                },
			],
		},
		plugins: [
            extractCSS,
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('production')
				}
			}),
			new UglifyJSPlugin({
                sourceMap: true
            }),
            new HtmlWebpackPlugin({
            template: "./htmlTemplate/template.html",
            filename: "../index.html"
            }),
            new StatsWriterPlugin({
            filename: "../stats/stats_client.json" // Default
            }),
            new CleanWebpackPlugin(['build','stats'])
		]
	}
	
];