import { Configuration } from "webpack";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { BuildOptions } from "./types/types";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import ImageminWebpWebpackPlugin from "imagemin-webp-webpack-plugin";

export function buildOptimization({
    mode,
}: BuildOptions): Configuration["optimization"] {
    const optimization: Configuration["optimization"] = {
        minimize: true,
        splitChunks: {
            // include all types of chunks
            chunks: "all",
        },
        minimizer: [
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        // Lossless optimization with custom option
                        // Feel free to experiment with options for better result for you
                        plugins: [
                            ["gifsicle", {}],
                            ["jpegtran", {}],
                            ["optipng", {}],
                            [
                                "svgo",
                                {
                                    plugins: [
                                        {
                                            name: "preset-default",
                                            params: {
                                                overrides: {
                                                    removeViewBox: false,
                                                },
                                            },
                                        },
                                    ],
                                },
                            ],
                        ],
                    },
                },
            }),
            new ImageminWebpWebpackPlugin(),
            new TerserPlugin({
                parallel: true,
                extractComments: "all",
            }),
            new CssMinimizerPlugin(),
        ],
    };
    return optimization;
}
