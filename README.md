# Webpack bundle

My bundle on **Webpack 5** (Typescript, SCSS, html modules, webp/avif transforming & checking, font plugging in, spritemap...)

## For creating html pages and modules, you need:

1. **Register html pages** for your project in the _"config/pages.ts"_:
    1. Add names for pages.
    2. Add js chunck names if the page will use them.
2. **Add html pages**, that you have registered, in _"src/html/pages/"_.
3. **Add modules html files** in _"src/html/modules"_ (there`s no need to register them).
4. **Use modules html** by printing `<%=_.template(require('raw-loader!@/html/modules/header.html').default)()%>` in the html pages (as an example).

## Also this Bundle can:

1. Transform your png/jpg/jpeg images in webp and avif. Just upload images in the `src/assets/img` folder.
    1. Typescrpt code in `src/ts/functions/functions.ts` is checking if the browser supports webp and avif images. If it does, `html` tag will have class 'webp' or/and 'avif', if it doesn\`t support them, `html` tag will have class 'no-webp' or/and 'no-avif'.
2. Automatically plug in your fonts in `_fonts.scss` file. There is no need to create it, just upload your fonts in the `src/assets/fonts` folder.
3. Automatically create a spritemap file from your sprites. Just upload your sprites in the `src/assets/sprites` folder.
