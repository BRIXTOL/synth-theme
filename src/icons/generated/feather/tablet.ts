import m from 'mithril'
import { SVGAttributes } from '../../../types/SVGAttributes'

/** Feather Icon */
export const Tablet = (SVGAttributes: SVGAttributes) => m('svg', { ...SVGAttributes, viewBox: '0 0 24 24' }, m.trust('<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>'))