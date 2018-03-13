const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
const nodeExternals = require('webpack-node-externals');

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
			],
		},
		plugins: [
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