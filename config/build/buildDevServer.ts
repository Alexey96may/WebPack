import Server from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export function buildDevServer(options: BuildOptions): Server.Configuration {
    return {
        port: options.port ?? 3000,
        open: true,
        historyApiFallback: true,
        hot: true,
    };
}
