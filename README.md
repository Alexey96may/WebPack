# Webpack bundle

My bundle on **Webpack 5** (Typescript, JS, SCSS, webp, html partials...)

## For create html file, you need:

1. **Register html pages** for your project in the _"config/pages.ts"_:
   1.1. Add names for pages.
   1.2. Add js chunck names if the page will use them.
2. **Add html pages**, that you have registered, in _"src/pages/"_.
   ! The page FOLDER must have name as the page name in _"config/pages.ts"_ (use Lower Case).
   ! The page FILE must have name as the page name in _"config/pages.ts"_ (use the same Case as for the name in "config/pages.ts).
3. **Add partials html** in _"src/partials"_ (there`s no need to register them).
Don`t use **-** in your partial file name!
4. **Use partials html** by print `<%= htmlWebpackPlugin.options.partials.partial_html_name %>` in the other html file.
