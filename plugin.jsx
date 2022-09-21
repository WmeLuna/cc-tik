import {findByProps} from "@cumcord/modules/webpack";
import {after} from "@cumcord/patcher";
//import {React} from "@cumcord/modules/common";

import TikTokPreviewAccessory from "./TikTokPreviewAccessory";

const {MessageAccessories} = findByProps("MessageAccessories");

let unpatch;

export function onLoad() {
  unpatch = after("render", MessageAccessories.prototype, function (_, ret) {
    if (this?.props && ret?.props)
      ret.props.children.push(
        <TikTokPreviewAccessory message={this.props.message} />
      );
      console.log(ret.props.children[9].props.message)
  });
}

export const onUnload = () => unpatch();