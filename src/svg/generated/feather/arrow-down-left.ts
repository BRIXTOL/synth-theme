import m from 'mithril'
import { SVGAttributes } from '../../../defs/svg'

/** Feather Icon */
export const ArrowDownLeft = (SVGAttributes: SVGAttributes) => m('svg', { ...SVGAttributes, viewBox: '0 0 24 24' }, m.trust('<line x1="17" y1="7" x2="7" y2="17"></line><polyline points="17 17 7 17 7 7"></polyline>'))