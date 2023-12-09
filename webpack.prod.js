const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { EsbuildPlugin } = require("esbuild-loader");
// const TerserPlugin = require("terser-webpack-plugin");
// const CssMinimizerPlugin = require("cs-minimizer-webpack-plugin");

module.exports = merge(common, {
	mode: "production",
	output: {
		filename: "[name].[contenthash].bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	optimization: {
		moduleIds: "deterministic",
		runtimeChunk: "single",
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all",
				},
			},
		},
		minimizer: [
			// new CssMinimizerPlugin(),
			// new TerserPlugin({
			//     terserOptions: {
			//         format: {
			//             comments: false
			//         }
			//     },
			//     extracctComments: false
			// }),
			new EsbuildPlugin({
				target: "es2015",
				css: true,
				treeShaking: true,
				minify: true,
			}),
			new HtmlWebpackPlugin({
				template: "public/index.html",
				minify: {
					removeAttributeQuotes: true,
					collapseWhitespace: true,
					removeComments: true,
				},
			}),
			new CompressionPlugin(),
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "static/css/[name].[contenthash].css",
			chunkFilename: "static/css/[id].[contenthash].css",
		}),
		new CleanWebpackPlugin(),
		new ESLintPlugin({
			extensions: ["js", "jsx", "ts", "tsx"],
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.(scss|sass)$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
		],
	},
});
