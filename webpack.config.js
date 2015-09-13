var webpack = require( 'webpack' );

module.exports = {
	entry: {
		app: "./src/entry.js",
		vendor: [ "three" ]
	},
	output: {
		path: __dirname,
		filename: "bundle.js"
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin( {
			name: "vendor",
			chunkName: "vendor",

			filename: "vendor.js",
			// (Give the chunk a different name)

			minChunks: Infinity,
		// (with more entries, this ensures that no other module
		//  goes into the vendor chunk)
		} )
	],
	module: { loaders: [ { test: /\.css$/, loader: "style!css" } ] }
};
