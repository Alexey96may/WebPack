export function isWebp() {
    function testWebp(cb: Function) {
        let webp = new Image();
        webp.onload = webp.onerror = function () {
            cb(webp.height == 2);
        };
        webp.src =
            "data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMw" +
            "AgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA";
    }

    testWebp(function (support: boolean) {
        let className = support === true ? "webp" : "no-webp";
        document.documentElement.classList.add(className);
    });
}

export function isAvif() {
    function testAvif(cb: Function) {
        let avif = new Image();
        avif.onload = avif.onerror = function () {
            cb(avif.height == 2);
        };
        avif.src =
            "data:image/avif;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMw" +
            "AgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA";
    }

    testAvif(function (support: boolean) {
        let className = support === true ? "avif" : "no-avif";
        document.documentElement.classList.add(className);
    });
}
