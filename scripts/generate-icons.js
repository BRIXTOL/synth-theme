const { readdir, readFile, writeFile } = require('fs-extra')
const { parse } = require('svg-parser')
const { camelCase, upperFirst } = require('lodash')

/**
 * Convert to string
 *
 * @param {object} prop
 */
const str = prop => JSON.stringify(prop)

/**
 * Convert icon name
 *
 * @param {string} path
 */
const iconName = path => upperFirst(camelCase(path.replace('.svg', '')))

/**
 * Mithril Virtual Icons Nodes
 *
 * @param {object} params
 */
const iconExport = ({
  children: [
    {
      tagName,
      properties,
      children: [ c ]
    }
  ]
}) => [
  `m("${tagName}", { ...${str(properties)}, ...attrs },`,
  `m("${c.tagName}", ${str(c.properties)}))`
].join('')

/**
 * Read Icon SVG file
 *
 * @param {string} path
 */
const readIcon = async path => {

  const file = await readFile(`src/icons/${path}`)
  const attrs = parse(file.toString())

  return `export const ${iconName(path)} = (attrs = {}) => ${iconExport(attrs)};`

}

/**
 * Read icons in directory and Write Icons
 *
 */
const getIcons = async () => {

  const items = []
  const icons = await readdir('src/icons')

  for (const icon of icons) {
    const item = await readIcon(icon)
    items.push(item)
  }

  const content = 'import m from "mithril";' + '\n\n' + items.join('\n\n')

  await writeFile('src/types/icons.ts', content)

}

module.exports = getIcons()
