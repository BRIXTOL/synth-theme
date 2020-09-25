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
      virtual({ scss: 'import "./src/synth.scss"' }),
      scss({
        include: './src/synth.scss',
        output: 'package/synth.min.css',
        watch: [ 'src/styles', 'src/style/mixins' ],
        prefix: '@import "./style/variables.scss";',
        processor: css => process.env.prod ? postcss([
          autoprefixer(),
          cssnano()
        ]) : null
      })
    ]
  },
  {
    input: 'src/synth.ts',
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
