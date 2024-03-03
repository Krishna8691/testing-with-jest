const HTMLWebpackPlugin = require("html-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");
const { join } = require("path");

module.exports = {
	mode: "development",
	entry: join(__dirname, "src", "index.js"),
	devServer: {
		port: 8000,
		hot: true,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							"@babel/preset-env",
							["@babel/preset-react", { runtime: "automatic" }],
						],
					},
				},
			},
		],
	},
	plugins: [
		new HTMLWebpackPlugin({
			favicon: false,
			template: "./public/index.html",
		}),
	],
};
