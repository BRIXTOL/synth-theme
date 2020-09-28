import { IActionItemAttrs as CUIActionItemAttrs } from "construct-ui";
import { IIconAttrs } from "../icons/Icon";
import { IconName } from "./../icons/index"

export declare interface IActionItemAttrs extends CUIActionItemAttrs {
  /** Attrs passed though to left-justified icon */
  iconLeftAttrs?: Partial<IIconAttrs>;

  /** Right-justified icon */
  iconRight?: IconName;

  /** Attrs passed though to right-justified icon */
  iconRightAttrs?: Partial<IIconAttrs>;
}
