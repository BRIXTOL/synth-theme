import m from 'mithril'
import classnames from 'classnames'
import { IAttrs, ISizeAttrs, IIntentAttrs } from 'construct-ui'
import { Classes } from '../utils/classes'
import { Svgs, SvgNames } from './generated'
import { SVGAttributes } from '../defs/svg'

export interface ISvgAttrs extends IAttrs, ISizeAttrs, IIntentAttrs {

  /** Define attributes on `<svg>` node */
  svg?: SVGAttributes | {};

  /** Icon name */
  name: SvgNames;

  /** Callback invoked on click; Passing this attr will apply hover styles to the icon */
  onclick?: (e: Event) => void;

  [htmlAttrs: string]: any;

}

export class Svg implements m.Component<ISvgAttrs> {

  public view({ attrs }: m.Vnode<ISvgAttrs>): m.Vnode {

    const {
      class: className,
      intent,
      name,
      onclick,
      svg,
      ...htmlAttrs
    } = attrs

    const classes = classnames(
      Classes.ICON_SVG,
      intent && `cui-${intent}`,
      className
    )

    return m('', {
      ...htmlAttrs,
      class: classes,
      svg,
      onclick
    }, Svgs[name](svg))
  }

}
