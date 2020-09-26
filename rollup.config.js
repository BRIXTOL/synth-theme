import scss from 'rollup-plugin-scss'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import { plugins } from '@brixtol/rollup-utils'
import autoprefixer from 'autoprefixer'
import postcss from 'postcss'
import cssnano from 'cssnano'
import virtual from '@rollup/plugin-virtual'

export default [
  {
    input: 'scss',
    plugins: [
      virtual({ scss: 'import "./style/synth.scss"' }),
      scss({
        include: './style/synth.scss',
        output: 'package/synth.min.css',
        watch: [ 'style/extends', 'style/mixins' ],
        prefix: '@import "./style/extends/variables.scss";',
        processor: css => process.env.prod ? postcss([
          autoprefixer(),
          cssnano()
        ]) : null
      })
    ]
  },
  {
    input: 'types/synth.ts',
    external: [ 'mithril' ],
    output: {
      format: 'es',
      dir: 'package',
      sourcemap: false
    },
    plugins: plugins([
      typescript()
    ], [
      terser({
        compress: {
          passes: 2
        }
      })
    ])
  }
]
