// full process looks something like this:

//  1. webpack grabs the entry point located at ./app/index.js.
//  2. It examines all of our import and require statements and creates a dependency graph.
//  3. webpack starts creating a bundle, whenever it comes across a path we have a loader for, it transforms the code according to that loader then adds it to the bundle.
//  4. It takes the final bundle and outputs it at dist/index_bundle.js.
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // Entry point:
    entry: './app/index.js',
        // Where to put the created bundle:
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    // All information for loaders will go under the 'rules' array.
    module: {
        rules: [
            // Since we want to use 'svg-inline-loader', 'test' property will be
            // the regex to match the file path and 'use' will be the name of the
            // loader (svg-inline-loader).
            { test: /\.svg$/, use: 'svg-inline-loader' },
            // Also the css loader.
            // And, style-loader, to inject the css into the DOM.
            // Order matters!!! Webpack processes in reverse order.
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            // Babel transforms 'next-gen' JavaScript(JSX) into the JavaScript of
            // today (ES6)
            { test: /\.(js)$/, use: 'babel-loader' }
        ]
    },
    // Adjust our webpack config in order to utilize HtmlWebpackPlugin
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        })
    ],
    // Better version than using EnvironmentPlugin in plugins
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}