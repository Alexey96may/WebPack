import { Page, Partial } from "./build/types/types";
import path from "path";
import fs from "fs";

export const pages: Page[] = [
    {
        name: "index",
        chunks: ["main"],
    },
    {
        name: "About",
    },
    {
        name: "Shop",
    },
];

export function getParcials(parcialsFolder: string) {
    let pars: Partial = {};

    fs.readdir(parcialsFolder, function (err, files) {
        if (err) {
            console.error("Could not list the directory.", err);
            process.exit(1);
        }

        files.forEach(function (file) {
            if (path.extname(file) === ".html") {
                let partial = fs.readFileSync(
                    path.resolve(parcialsFolder, file),
                    "utf8"
                );
                let fileName = path.basename(file).slice(0, -5).toLowerCase();
                pars[fileName] = partial;
            }
        });
    });

    return pars;
}
