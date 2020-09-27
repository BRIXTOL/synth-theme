import m from 'mithril';
import classnames from 'classnames';
import { IAttrs, ISizeAttrs, IIntentAttrs, Classes as CUIClasses  } from 'construct-ui'
import { Classes } from '../utils/classes'
import { Icons, IconNames } from './generated';
import { SVGAttributes } from '../types/SVGAttributes'

interface IIconAttrs extends IAttrs, ISizeAttrs, IIntentAttrs  {

  /** Define attributes on `<svg>` node */
  svg?: SVGAttributes;

  /** Icon name */
  name: IconNames

  /** Callback invoked on click; Passing this attr will apply hover styles to the icon */
  onclick?: (e: Event) => void;

  [htmlAttrs: string]: any;

}


export class Icon implements m.Component<IIconAttrs> {

  public view({ attrs }: m.Vnode<IIconAttrs>) {

    const {
      class: className,
      intent,
      name,
      onclick,
      svg,
      size,
      ...htmlAttrs
    } = attrs;

    const classes = svg ? classnames(
      Classes.ICON_SVG,
      intent && `cui-${intent}`,
      className
    ) : classnames(
      CUIClasses.ICON,
      `${CUIClasses.ICON}-${name}`,
      intent && `cui-${intent}`,
      size && `cui-${size}`,
      onclick && CUIClasses.ICON_ACTION,
      className
    );

    return svg ? Icons[name](svg) : m('', {
      ...htmlAttrs,
      class: classes,
      svg,
      onclick
    }, Icons[name]({}))
  }
}
