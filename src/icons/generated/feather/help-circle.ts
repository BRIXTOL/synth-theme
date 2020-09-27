import m from 'mithril'
import { SVGAttributes } from '../../../types/SVGAttributes'

/** Feather Icon */
export const HelpCircle = (SVGAttributes: SVGAttributes) => m('svg', { ...SVGAttributes, viewBox: '0 0 24 24' }, m.trust('<circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>'))