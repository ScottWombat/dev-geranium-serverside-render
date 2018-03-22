const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin({
     filename: '[name]_[hash:8].bundle.css',
    disable: process.env.NODE_ENV === "development"
});
module.exports = [
	{
		name: 'Wild Geranium',
		target: 'node',
        externals: [nodeExternals()],
		entry: {
            app : ['./src/server/index.js']
            
        },
        output: {
            path: path.resolve(__dirname,'build'),
            filename: "server.js",
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
                        limit: 8192
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
            new StatsWriterPlugin({
            filename: "../stats/server/stats.json" // Default
            })
		]
	}
	
];