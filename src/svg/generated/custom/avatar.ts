import m from 'mithril'
import { SVGAttributes } from '../../../defs/svg'

/** Custom Icon */
export const Avatar = (SVGAttributes: SVGAttributes) => m('svg', { ...SVGAttributes, viewBox: '0 0 84.34 55.47' }, m.trust('<path d="M0 27.73v27.74h84.34V0H0zm78.23 0v21.63H6.1V6.1h72.12zM18.5 12.93l4.3 5.9 6.32 8.83 6.38 8.9 3.8 5.2c.15.2.24-6.5.24-14.8v-15.1H17.7l.8 1.08zM45.4 26.9c0 8.25.1 15 .24 15s.4-.3.64-.7 2.9-4.14 6-8.34L67.18 12c0-.1-4.9-.12-10.9-.12H45.4zm23.13-5.73L52.4 43.62l9.75.1H72c.07 0 .02-6.23.02-13.7l-.1-13.53zM13.18 30.3v13.56H23c7.85 0 9.78-.1 9.57-.4s-2.3-3.13-4.72-6.5L13.46 17c-.16-.14-.28 5.26-.28 13.3z"></path>'))