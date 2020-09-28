import scss from "rollup-plugin-scss"
import ts from "rollup-plugin-typescript2"
import { terser } from "rollup-plugin-terser"
import { plugins } from "@brixtol/rollup-utils"
import autoprefixer from "autoprefixer"
import postcss from "postcss"
import cssnano from "cssnano"
import virtual from "@rollup/plugin-virtual"

export default [
  {
    input: "src/index.ts",
    external: [
      "mithril",
      "construct-ui",
      "classnames"
    ],
    output: [
      {
        dir: "package",
        format: "esm",
        sourcemap: false
      }
    ],
    plugins: [
      ts({
        typescript: require("typescript")
      })
    ]
  },
  {
    input: "scss",
    plugins: [
      virtual({ scss: 'import "./style/synth.scss"' }),
      scss({
        include: "./style/synth.scss",
        output: "package/synth.min.css",
        watch: [ "style/extends", "style/mixins" ],
        prefix: '@import "./style/extends/variables.scss";',
        processor: (css) => postcss([ autoprefixer(), cssnano() ])
      })
    ]
  }
]
