# Webpack bundle

My bundle on **Webpack 5** (Typescript, JS, SCSS, webp, html partials...)

## For create html file, you need:

1. **Register html pages** for your project in the _"config/pages.ts"_:
    1. Add names for pages.
    2. Add js chunck names if the page will use them.
2. **Add html pages**, that you have registered, in _"src/pages/"_.
    - The page FOLDER must have name as the page name in _"config/pages.ts"_ (use Lower Case).
    - The page FILE must have name as the page name in _"config/pages.ts"_ (use the same Case as for the name in "config/pages.ts).
3. **Add partial html files** in _"src/partials"_ (there`s no need to register them).
    - Don`t use **"-"** in your partial file name!
4. **Use partial html** by printing `<%= htmlWebpackPlugin.options.partials.partial_name %>` in the other html file.
