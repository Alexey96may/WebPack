import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";
import path from "path";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
    const isDev = options.mode === "development";

    const assetLoader = {
        test: /\.(png|svg|jpg|jpeg|webp)$/i,
        type: "asset/resource",
    };

    const icoLoader = {
        test: /\.ico$/,
        type: "asset",
        generator: {
            filename: path.join("[name].[contenthash][ext]"),
            outputPath: path.join("assets", "img", "icons/"),
            publicPath: path.join("assets", "img", "icons/"),
        },
    };

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev
                    ? "[path][name]__[local]"
                    : "[hash:base64:8]",
            },
        },
    };

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            cssLoaderWithModules,
            "postcss-loader",
            "group-css-media-queries-loader",
            // Compiles Sass to CSS
            "sass-loader",
        ],
    };

    const tsLoader = {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: [
            {
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                },
            },
        ],
    };

    return [assetLoader, scssLoader, tsLoader, icoLoader];
}
