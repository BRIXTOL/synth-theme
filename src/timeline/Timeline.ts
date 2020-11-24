import m from 'mithril'
import classnames from 'classnames'
import { Colors, IAttrs, ISizeAttrs } from 'construct-ui'
import { Classes } from '../utils/classes'

export interface ITimelineAttrs extends IAttrs, ISizeAttrs {

  /** Align line */
  align: 'left' | 'center' | 'right'

  /** Colors */
  color: string,

  [htmlAttrs: string]: any;
}

export class Timeline implements m.Component<ITimelineAttrs> {

  public view({ attrs, children }: m.Vnode<ITimelineAttrs>): m.Vnode {

    const {
      basic,
      class: className,
      align,
      size,
      color,
      ...htmlAttrs
    } = attrs;

    const classes = classnames(
      Classes.TIMELINE,
      align || 'center',
      size && `cui-${size}`,
      color || Colors.BLUE_GREY200,
      className
    );

    return m('', { ...htmlAttrs, class: classes }, children);
  }
}
