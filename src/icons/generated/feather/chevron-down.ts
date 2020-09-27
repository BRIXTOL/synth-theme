import m from 'mithril'
import { SVGAttributes } from '../../../types/SVGAttributes'

/** Feather Icon */
export const ChevronDown = (SVGAttributes: SVGAttributes) => m('svg', { ...SVGAttributes, viewBox: '0 0 24 24' }, m.trust('<polyline points="6 9 12 15 18 9"></polyline>'))