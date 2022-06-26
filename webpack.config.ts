import webpack, { ProvidePlugin } from 'webpack';
import path from 'path';
import HTMLPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import TSConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const outputFolderName = 'dist';

function getFileName(ext: string) {
    return `${ext}/[name].${ext}`;
}

function getCssLoaders(extra?: webpack.RuleSetUseItem) {
    const loaders: webpack.RuleSetUseItem[] = [
        MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                modules: {
                    auto: true,
                    localIdentName: isDev ? '[name]__[local]_[hash:base64:6]' : '[hash:base64]',
                },
            },
        },
    ];

    if (extra) {
        loaders.push(extra);
    }

    return loaders;
}

const config: webpack.Configuration = {
    mode: isDev ? 'development' : 'production',
    target: 'web',
    context: path.resolve(__dirname, 'src'),
    entry: {
        background: './core/background.ts',
        popup: './popup-scripts/index.tsx',
        content: './utils/execute-content-scripts.ts',
    },
    output: {
        filename: getFileName('js'),
        path: path.resolve(__dirname, outputFolderName),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        plugins: [new TSConfigPathsPlugin()],
    },
    optimization: {
        // splitChunks: {
        //     chunks(chunk) {
        //         return chunk.name !== 'content';
        //     },
        // },
        minimizer: [`...`, new CssMinimizerPlugin()],
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new HTMLPlugin({
            template: './public/index.html',
            filename: 'popup.html',
            excludeChunks: ['background', 'content'],
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/public'),
                    to: path.resolve(__dirname, 'dist'),
                    filter(filepath) {
                        return !/\.html$/.test(filepath);
                    },
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: getFileName('css'),
        }),
        new ESLintPlugin({
            extensions: ['.js', '.ts', '.jsx', '.tsx'],
        }),
        new ProvidePlugin({
            React: 'react',
        }),
        new CleanWebpackPlugin({
            protectWebpackAssets: false,
            cleanAfterEveryBuildPatterns: ['**/*.LICENSE.txt'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(png|gif|svg|jpg|jpeg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]',
                },
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]',
                },
            },
            {
                test: /\.css$/,
                use: getCssLoaders(),
            },
            {
                test: /\.s[ac]ss$/,
                use: getCssLoaders('sass-loader'),
            },
            {
                test: /\.(m?js)|(jsx)|(tsx?)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
};

export default config;
