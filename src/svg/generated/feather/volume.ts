import m from 'mithril'
import { SVGAttributes } from '../../../defs/svg'

/** Feather Icon */
export const Volume = (SVGAttributes: SVGAttributes) => m('svg', { ...SVGAttributes, viewBox: '0 0 24 24' }, m.trust('<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>'))