import { findByProps } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
import importCSS from "./styles.css";

import TikTokPreviewAccessory from "./TikTokPreviewAccessory";

const {MessageAccessories} = findByProps("MessageAccessories");

let unpatch;
let uninjectCSS;

export function onLoad() {
  uninjectCSS = importCSS();
  unpatch = after("render", MessageAccessories.prototype, function (_, ret) {
    if (this?.props && ret?.props)
      ret.props.children.push(
        <TikTokPreviewAccessory message={this.props.message} />
      );
  });
}

export function onUnload() {
   unpatch();
   uninjectCSS();
}