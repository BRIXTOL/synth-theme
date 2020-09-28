import m from 'mithril'
import { SVGAttributes } from '../../../defs/svg'

/** Feather Icon */
export const Slash = (SVGAttributes: SVGAttributes) => m('svg', { ...SVGAttributes, viewBox: '0 0 24 24' }, m.trust('<circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>'))