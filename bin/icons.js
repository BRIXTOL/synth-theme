const { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs')
const { extname, join, resolve, basename } = require('path')
const cheerio = require('cheerio')
const { minify } = require('html-minifier')
const chalk = require('chalk')

/* -------------------------------------------- */
/*          GENERATE JSON SVG MAPPINGS          */
/* -------------------------------------------- */

console.log(chalk`{cyan GENERATING JSON SVG MAPPINGS}\n`)

const IN_DIR = resolve(__dirname, '../icons')
const OUT_FILE = resolve(__dirname, '../package/icons.json')

if (!existsSync(OUT_FILE)) {
  mkdirSync(OUT_FILE)
}

/**
 * Build an object in the format: `{ <name>: <contents> }`.
 *
 * @param {string[]} svgFiles - A list of filenames.
 * @param {Function} getSvg - Returns the contents of SVG file given a filename.
 * @returns {Object}
 */
function buildIconsObject (svgFiles, getSvg) {

  return svgFiles.map(svgFile => {

    const name = basename(svgFile, '.svg')
    const svg = getSvg(svgFile)
    const contents = getSvgContents(svg)

    console.log(chalk`  - {magentaBright ${name}}`)
    return {
      name,
      contents
    }

  }).reduce((icons, icon) => {

    icons[icon.name] = icon.contents
    return icons

  }, {})
}

/**
 * Get contents between opening and closing `<svg>` tags.
 *
 * @param {string} svg
 * @returns {string}
 */
function getSvgContents (svg) {

  const $ = cheerio.load(svg)

  return minify($('svg').html(), {
    collapseWhitespace: true
  })

}

const svgFiles = readdirSync(IN_DIR).filter(file => extname(file) === '.svg')
const getSvg = svgFile => readFileSync(join(IN_DIR, svgFile))
const icons = buildIconsObject(svgFiles, getSvg)

writeFileSync(OUT_FILE, JSON.stringify(icons))

console.log(chalk`{white.dim \nGenerated ${basename(OUT_FILE)}}\n`)

/* -------------------------------------------- */
/*           GENERATE TYPESCRIPT FILES          */
/* -------------------------------------------- */

console.log(chalk`{cyan GENERATING TYPESCRIPT EXPORTS}\n`)

const GENERATED_ICON_PATH = resolve(process.cwd(), './types/icons')
const ICONS = require('../package/icons.json')

if (!existsSync(GENERATED_ICON_PATH)) {

  mkdirSync(GENERATED_ICON_PATH)

}

/**
 * Write Lines to File
 *
 * @param {string} filename
 * @param {string[]} lines
 */
async function writeLinesToFile (filename, ...lines) {

  const outputPath = join(GENERATED_ICON_PATH, filename)
  const contents = [ '/* tslint:disable */', ...lines, '' ].join('\n')

  writeFileSync(outputPath, contents)

}

/**
 * Generates Icon Names Export
 *
 * @returns {string}
 */
function exportIconNames () {

  const icons = Object.keys(ICONS).map(iconName => {

    const constName = iconName.replace(/-/g, '_')
    return `export const ${constName.toUpperCase()} = '${iconName}';`

  })

  console.log(chalk`  - {magentaBright IconNames.ts}`)

  return icons
}

/**
 * Generates Icon Contents Export
 *
 * @returns {string}
 */
function exportIconContents () {

  const contents = Object.keys(ICONS).map(iconName => `'${iconName}' : '${ICONS[iconName]}'\n`)

  console.log(chalk`  - {magentaBright IconContents.ts}`)

  return `export default { ${contents} }`

}

/**
 * Generates Index export
 *
 * @returns {string}
 */
function generateIndex () {

  const index = `import * as Icons from './IconNames';
  import IconContents from './IconContents';

  export { Icons, IconContents };
  `
  console.log(chalk`  - {magentaBright index.ts}\n`)

  return index
}

/* -------------------------------------------- */
/*                  WRITE FILES                 */
/* -------------------------------------------- */

writeLinesToFile('IconNames.ts', ...exportIconNames())
writeLinesToFile('IconContents.ts', exportIconContents())
writeLinesToFile('index.ts', generateIndex())

console.log(chalk`{white.dim Generated 3 files}\n`)
