import m from 'mithril'
import { SVGAttributes } from '../../../types/SVGAttributes'

/** Feather Icon */
export const RotateCw = (SVGAttributes: SVGAttributes) => m('svg', { ...SVGAttributes, viewBox: '0 0 24 24' }, m.trust('<polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>'))