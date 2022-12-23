module.exports = {
  plugins: [
    "tailwindcss",
    ["autoprefixer", {browsers: ">0.3%, defaults, supports es5"}],
    "postcss-color-rgba-fallback",
    "postcss-opacity",
    "postcss-pseudoelements",
    "postcss-vmin",
    "pixrem",
    "postcss-will-change",
    "flex-gap-polyfill",
  ],
}
