export interface BuildPaths {
    entry: string;
    html: string;
    public: string;
    output: string;
    htmlPages: string;
    htmlPartials: string;
    src: string;
}

export type BuildMode = "production" | "development";
export type BuildPlatform = "mobile" | "desktop";

export interface BuildOptions {
    port: number;
    paths: BuildPaths;
    mode: BuildMode;
    platform: BuildPlatform;
    analyzer?: boolean;
}

export interface Page {
    name: string;
    chunks?: string[];
    partials?: string[];
}

export interface Partial {
    [key: string]: string;
}
