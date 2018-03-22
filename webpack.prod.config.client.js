const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin')
const extractCSS = new ExtractTextPlugin({
    allChunks: true,
    filename: '[name]_[hash:8].bundle.css',
    disable: process.env.NODE_ENV === "development"
});

//require('dotenv').config();

module.exports = [
	{
		name: 'Wild Geranium',
		target: 'web',
		entry: {
            app : ['./src/client/browser.js']
        },
        output: {
            path: path.join(__dirname, './build/compiled'),
            filename: "[name]_[hash:8].bundle.js",
            publicPath: '/static/compiled'
		},
        optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    priority: -20,
                    chunks: "all"
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
                        test: /\.(css|scss)$/,
                        exclude: /node_modules/,
                        use: extractCSS.extract({
                            // use style-loader in development
                            fallback: 'style-loader',
                            use: [
                                 {loader: 'css-loader',options: { minimize: true }},
                                 {loader: 'postcss-loader',
                                            options: {
                                                plugins: (loader) => [
                                                    require('autoprefixer')({
                                                    browsers: ['last 3 versions', '> 1%']
                                                    })
                                                ]
                                            }
                                 },
                                 {
                                    // Loads a SASS/SCSS file and compiles it to CSS
                                    loader: 'sass-loader'
                                 }
                            ]
                        })
                },
                
                {
                test: /\.(jpg|png|gif|pdf|ico)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                           // Images larger than 10 KB won’t be inlined
                          limit: 10 * 1024,
                            name: "/assets/[hash].[ext]"
                          }
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
            template: "./htmlTemplate/template.min.html",
            filename: "../index.html"
            }),
            new StatsWriterPlugin({
            filename: "../../stats/client/stats.json" // Default
            }),
            new CleanWebpackPlugin(['build','dist','stats'])
		]
	}
	
];