import m from 'mithril'
import classnames from 'classnames'
import { IAttrs, Icon, IconName, ISizeAttrs } from 'construct-ui'
import { Classes } from 'src/utils/classes'
//import { Classes } from '../utils/classes'


export interface ITimelineItemAttrs extends IAttrs, ISizeAttrs {

  /** Left-justified content */
  position?: 'left' | 'right';

  /** Icon Name */
  iconName?: IconName;

  /** Icon Size */
  iconSize?: string;

  /** Inner text or content */
  title?: m.Children;

  /** Full width */
  fluid?: boolean,

  /** Inner text or content */
  content?: Array<m.Children>;

  /** Callback invoked on click */
  onclick?: (e: Event) => void;

  [htmlAttrs: string]: any;
}

export class TimelineItem implements m.Component<ITimelineItemAttrs> {

  public view({ attrs }: m.Vnode<ITimelineItemAttrs>): m.Vnode {

    const {
      class: className,
      position,
      iconName = 'calendar',
      iconSize,
      title,
      size,
      fluid,
      content,
      onclick,
      ...htmlAttrs
    } = attrs

    const iconClasses = classnames(
      Classes.TIMELINE_ICON
      , iconSize && `cui-${iconSize}`
    )

    return m('', {
      ...htmlAttrs,
      class: classnames(
        Classes.TIMELINE_ITEM,
        className
      ),
      onclick
    }, [
        m(Icon, {
          name: iconName,
          class: iconClasses,
        }),
        m('', {
          class: classnames(
            Classes.TIMELINE_CONTENT
            , position && `cui-timeline-${position}`
            , size || fluid ? 'fluid' : `cui-md`
            , className
          )
        }, content)
    ])
  }



}
