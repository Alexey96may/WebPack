import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";
import path from "path";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
    const isDev = options.mode === "development";

    const assetLoader = {
        test: /\.(png|svg|jpg|jpeg|webp|avif)$/i,
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
            // isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            MiniCssExtractPlugin.loader,
            cssLoaderWithModules,
            "postcss-loader",
            "group-css-media-queries",
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

    const fontsLoader = {
        test: /\.(woff(2)?|ttf|eot|otf)$/,
        type: "asset/resource",
        generator: {
            filename: "assets/fonts/[name][ext]",
        },
    };

    return [assetLoader, scssLoader, tsLoader, icoLoader, fontsLoader];
}
