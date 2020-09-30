import scss from 'rollup-plugin-scss'
import typescript from '@wessberg/rollup-plugin-ts'
import { terser } from 'rollup-plugin-terser'
import { plugins } from '@brixtol/rollup-utils'
import autoprefixer from 'autoprefixer'
import postcss from 'postcss'
import cssnano from 'cssnano'

/**
 * @type {import('rollup').RollupOptions}
 */
const rollup = {
  input: 'src/index.ts',
  external: [
    'mithril',
    'construct-ui',
    'classnames'
  ],
  treeshake: true,
  output: [
    {
      dir: 'package',
      format: 'es',
      sourcemap: false
    }
  ],
  plugins: plugins([
    scss({
      include: 'style/synth.scss',
      output: 'package/synth.min.css',
      watch: [ 'style/extends', 'style/mixins' ],
      prefix: '@import "style/extends/variables.scss";',
      processor: (css) => postcss([
        autoprefixer()
        // cssnano()
      ])
    }),
    typescript({
      typescript: require('typescript')
    })
  ], [
    terser()
  ])
}

export default rollup
