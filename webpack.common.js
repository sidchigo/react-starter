const path = require("path");

module.exports = {
	entry: path.join(__dirname, "src", "index.tsx"),
	resolve: {
		extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
	},
	output: {
		publicPath: "/",
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.html$/,
				use: ["html-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
				type: "asset/resource",
			},
			{
				test: /\.(woff|woff2|ttf|otf|eot)$/i,
				type: "asset/resource",
			},
		],
	},
	devServer: {
		historyApiFallback: true,
	},
};
