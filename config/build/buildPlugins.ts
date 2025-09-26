import webpack, { Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";
import { pages, getParcials } from "../pages";
import { fontPlugIn } from "./utils/font-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ImageminAvifWebpackPlugin from "imagemin-avif-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import SVGSpritemapPlugin from "svg-spritemap-webpack-plugin";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins({
    mode,
    paths,
    analyzer,
    platform,
}: BuildOptions): Configuration["plugins"] {
    const isDev = mode === "development";
    const isProd = mode === "production";

    const plugins: Configuration["plugins"] = [
        new DefinePlugin({
            __PLATFORM__: JSON.stringify(platform),
            __ENV__: JSON.stringify(mode),
        }),
        new SVGSpritemapPlugin(["src/assets/**/*.svg"]),
        new ImageminAvifWebpackPlugin({
            config: [
                {
                    test: /\.(jpe?g|png)/,
                    options: {
                        quality: 75,
                    },
                },
            ],
            overrideExtension: true,
            detailedLogs: true,
            silent: false,
            strict: false,
        }),
    ];

    if (pages.length > 0) {
        const htmlParcials = getParcials(paths.htmlPartials);

        pages.forEach((page) => {
            plugins.push(
                new HtmlWebpackPlugin({
                    favicon: path.resolve(paths.public, "favicon.ico"),
                    filename: `${page.name}.html`,
                    template: path.resolve(
                        paths.htmlPages,
                        page.name.toLowerCase(),
                        `${page.name}.html`
                    ),
                    chunks: page.chunks ? page.chunks : [],
                    partials: htmlParcials,
                })
            );
        });
    }

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin());
        plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    plugins.push(
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css",
        })
    );

    plugins.push(
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(paths.public, "locales"),
                    to: path.resolve(paths.output, "locales"),
                },
                {
                    from: path.resolve(paths.src, "assets", "img"),
                    to: path.resolve(paths.output, "assets", "img"),
                },
            ],
        })
    );

    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin());
    }

    fontPlugIn(
        path.resolve(paths.src, "assets", "fonts"),
        path.resolve(paths.src, "assets", "scss", "utils", "_fonts.scss")
    );

    return plugins;
}
