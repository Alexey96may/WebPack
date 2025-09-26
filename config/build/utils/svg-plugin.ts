import fs from "fs";
import path from "path";

export function svgPlugIn(fontPath: string, cssFontPath: string) {
    let fontsFile = cssFontPath;
    fs.readdir(fontPath, function (err, fontsFiles) {
        if (err) {
            console.error("Could not list the directory.", err);
            process.exit(1);
        }

        if (fontsFiles) {
            if (!fs.existsSync(fontsFile)) {
                fs.writeFile(fontsFile, "", cb);
                let newFileOnly;
                for (let i = 0; i < fontsFiles.length; i++) {
                    let fontFileName = fontsFiles[i].split(".")[0];
                    let fontFileExt = path.extname(fontsFiles[i]).slice(1);
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split("-")[0]
                            ? fontFileName.split("-")[0]
                            : fontFileName;
                        let fontWeight = fontFileName.split("-")[1]
                            ? fontFileName.split("-")[1]
                            : fontFileName;
                        if (fontWeight.toLowerCase() === "thin") {
                            fontWeight = "100";
                        } else if (fontWeight.toLowerCase() === "extralight") {
                            fontWeight = "200";
                        } else if (fontWeight.toLowerCase() === "light") {
                            fontWeight = "300";
                        } else if (fontWeight.toLowerCase() === "medium") {
                            fontWeight = "500";
                        } else if (fontWeight.toLowerCase() === "semibold") {
                            fontWeight = "600";
                        } else if (fontWeight.toLowerCase() === "bold") {
                            fontWeight = "700";
                        } else if (
                            fontWeight.toLowerCase() === "extrabold" ||
                            fontWeight.toLowerCase() === "heavy"
                        ) {
                            fontWeight = "800";
                        } else if (fontWeight.toLowerCase() === "black") {
                            fontWeight = "900";
                        } else {
                            fontWeight = "400";
                        }
                        fs.appendFile(
                            fontsFile,
                            `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.${fontFileExt}") format(${fontFileExt});\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
                            cb
                        );
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                console.log(
                    "Файл scss/fonts.scss уже существует, для обновления удалите его!"
                );
            }
        }
    });

    function cb() {}
}
