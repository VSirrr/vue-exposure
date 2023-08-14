const pkg = require("./package.json");
const terser = require("@rollup/plugin-terser");
const license = require("rollup-plugin-license");
const filesize = require("rollup-plugin-filesize");
const { getBabelOutputPlugin } = require("@rollup/plugin-babel");

module.exports = {
  input: "lib/vue-exposure.js",
  output: {
    name: "VueExposure",
    file: "./dist/vue-exposure.min.js",
    format: "umd",
  },
  plugins: [
    getBabelOutputPlugin({
      presets: ["@babel/preset-env"],
      allowAllFormats: true,
    }),
    terser(),
    filesize(),
    license({
      banner: {
        commentStyle: "ignored",
        content: `Bundle of <%= pkg.name %>
                  Generated: <%= moment().format('YYYY-MM-DD') %>
                  Version: <%= pkg.version %>
                `,
        data() {
          return { pkg };
        },
      },
    }),
  ],
};
