import m from 'mithril'
import { SVGAttributes } from '../../../types/SVGAttributes'

/** Feather Icon */
export const Percent = (SVGAttributes: SVGAttributes) => m('svg', { ...SVGAttributes, viewBox: '0 0 24 24' }, m.trust('<line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle>'))