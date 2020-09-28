const { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs')
const { extname, join, resolve, basename, dirname } = require('path')
const cheerio = require('cheerio')
const { minify } = require('html-minifier')
const chalk = require('chalk')
const featherIcons = require('feather-icons/dist/icons.json')
const { camelCase, upperFirst, snakeCase } = require('lodash')
const { log } = console

/**
 * SVG Attribute Type Definitions
 */
const SVG_DEFS = '../../../defs/svg'

/**
 * `/src/svg/generated`
 */
const ICON_GEN = resolve(process.cwd(), './src/svg/generated')

if (!existsSync(ICON_GEN)) mkdirSync(ICON_GEN)

/**
 * `/src/svg/generated/feather`
 */
const FEATHER_DIR = resolve(process.cwd(), './src/svg/generated/feather')

if (!existsSync(FEATHER_DIR)) mkdirSync(FEATHER_DIR)

/**
 * `/src/svg/generated/custom`
 */
const CUSTOM_DIR = resolve(process.cwd(), './src/svg/generated/custom')

if (!existsSync(CUSTOM_DIR)) mkdirSync(CUSTOM_DIR)

/**
 * `/src/svg/generated`
 */
// const SVG_GEN = resolve(process.cwd(), 'src/icons/generated/vnodes')

// if (!existsSync(SVG_GEN)) mkdirSync(SVG_GEN)

/**
 * `/icons/*.svg`
 */
const SVGS_DIR = resolve(process.cwd(), 'svgs')

// if (!existsSync(ICON_GEN)) mkdirSync(ICON_GEN)

/**
 * Get contents between opening and closing `<svg>` tags.
 *
 * @param {string} svg
 * @returns {{attibutes: string, contents: string }}
 */
function getSvgContents (svg) {

  const $ = cheerio.load(svg)
  const { viewBox } = $('svg').attr()
  const content = minify($('svg').html(), { collapseWhitespace: true })

  return {
    viewBox,
    content
  }

}

/**
 * Generate Mithril Icon Vnodes
 *
 * @param {string} name The icon name
 * @param {string} viewBox The viewBox attribute value
 * @param {string} content Inner `<svg>` contents
 * @param {'feather'|'custom'} type Icon pack
 */
function generateVnode (name, viewBox, content, type) {

  const prepend = [
    'import m from \'mithril\'',
    `import { SVGAttributes } from '${SVG_DEFS}'\n`
  ].join('\n')

  const comment = type === 'feather'
    ? '/** Feather Icon */'
    : '/** Custom Icon */'

  const xport = `export const ${upperFirst(camelCase(name))} = (SVGAttributes: SVGAttributes)`
  const attrs = `{ ...SVGAttributes, viewBox: '${viewBox}' }`
  const vnode = `${xport} => m('svg', ${attrs}, m.trust('${content}'))`

  return `${prepend}\n${comment}\n${vnode}`

}

/**
 * Build Feather Icon Exports
 *
 * @param {string} viewBox The viewBox attribute value
 */
function buildFeatherIcons (viewBox) {

  const xport = []
  const names = []

  log(chalk`\n{white.bold Feather Icons}`)

  for (const [ _name, contents ] of Object.entries(featherIcons)) {

    const name = upperFirst(camelCase(_name))
    const vnode = generateVnode(name, viewBox, contents, 'feather')

    // WRITE SVG VNODE
    writeFileSync(join(FEATHER_DIR, `${_name}.ts`), vnode)

    // RECORD REFS
    names.push(name)
    xport.push(`export { ${name} } from './feather/${_name}'`)

    // LOG
    log(chalk`  - {magentaBright ${name}}`)

  }

  // LOG
  log(chalk`\n{blue Generated {blueBright ${names.length})} files}`)

  return {
    xport,
    names
  }

}

/**
 * Build Custom Icon Exports
 *
 * @param {string[]} svgFiles Custom SVG files list
 * @param {function} getSvg SVG function getter
 */
function buildCustomIcons (svgFiles, getSvg) {

  const { xport, names } = buildFeatherIcons('0 0 24 24')

  log(chalk`\n{white.bold Custom Icons}`)

  xport.push('\n// CUSTOM ICONS -------------------------------\n')

  for (const svgFile of svgFiles) {

    const _name = basename(svgFile, '.svg')
    const file = readFileSync(join(SVGS_DIR, svgFile))
    const { content, viewBox } = getSvgContents(file)
    const vnode = generateVnode(_name, viewBox, content, 'custom')

    // WRITE SVG VNODE
    writeFileSync(join(CUSTOM_DIR, `${_name}.ts`), vnode)

    const name = upperFirst(camelCase(_name))
    // RECORD REFS
    names.push(name)
    xport.push(`export { ${name} } from './custom/${_name}'`)

    // LOG
    log(chalk`  - {magentaBright ${_name}}`)
  }

  // LOG
  log(chalk`\n{green Generated {greenBright ${svgFiles.length}} files}`)

  return {
    xport,
    names
  }

}

/* -------------------------------------------- */
/*           GENERATE TYPESCRIPT FILES          */
/* -------------------------------------------- */

/**
 * Write Lines to File
 *
 * @param {string} directory
 * @param {string} filename
 * @param {string[]} lines
 */
function writeLinesToFile (directory, filename, ...lines) {

  const outputPath = join(directory, filename)
  const content = [ '/* tslint:disable */', ...lines, '' ].join('\n')

  log(chalk`  - {magentaBright ${filename}}`)

  writeFileSync(outputPath, content)

}

/**
 * Generates Icon Names Export
 *
 * @returns {string}
 */
function exportIconNames (x) {

  const object = 'export const SvgNames = {\n'
  const props = x.map(n => `${snakeCase(n).toUpperCase()}: '${upperFirst(camelCase(n))}'`)
  const types = '\n\nexport type SvgNames = typeof SvgNames[keyof typeof SvgNames];'

  return `${object}  ${props.join(',\n  ')}\n}${types}`
}

/**
 * Generates Index export
 *
 * @returns {string}
 */
function generateIndex () {

  const index = [
    'import * as Svgs from \'./Svgs\'',
    'import { SvgNames } from \'./SvgNames\'',
    'export { Svgs, SvgNames }'
  ].join('\n')

  return index
}

/* -------------------------------------------- */
/*                  WRITE FILES                 */
/* -------------------------------------------- */

const svgFiles = readdirSync(SVGS_DIR).filter(file => extname(file) === '.svg')
const getSvg = svgFile => readFileSync(join(SVGS_DIR, svgFile))
const { xport, names } = buildCustomIcons(svgFiles, getSvg)

// LOG
log(chalk`\n{white.bold TypeScript Files}`)

// SVGS
writeLinesToFile(ICON_GEN, 'Svgs.ts', xport.join('\n'))
writeLinesToFile(ICON_GEN, 'SvgNames.ts', exportIconNames(names))
writeLinesToFile(ICON_GEN, 'index.ts', generateIndex(names))

log(chalk`\n{greenBright Generated {bold ${names.length + 3}} files}\n`)
