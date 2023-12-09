const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = merge(common, {
	mode: "development",
	output: {
		filename: "[name].bunle.js",
		path: path.resolve(__dirname, "dist"),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "public", "index.html"),
		}),
		new ESLintPlugin({
			extensions: ["js", "jsx", "ts", "tsx"],
		}),
	],
	module: {
		rules: [
			{
				test: /\.(css|sass|scss)$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		],
	},
});
