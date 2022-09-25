import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";
import { constants as Constants } from "@cumcord/modules/common";

import TikVideo from "./VideoPlayer";

const MESSAGE_LINK_REGEX = /https?:\/\/(?:\w+\.)?tiktok?\.com\/.*/g;

const Embed = findByDisplayName("Embed");

export default function TikTokPreviewAccessory(props) {
  const { message } = props;
  const messageLinks = message.content.match(MESSAGE_LINK_REGEX);

  if (messageLinks) {
    const elements = [];
    let embed = {
      rawDescription: "",
      color: "#7401d3",
      author: {
        name: "TikTok Embed",
        iconProxyURL: "https://sf16-sg.tiktokcdn.com/obj/eden-sg/uvkuhyieh7lpqpbj/pwa/512x512.png"
      },
      feilds: [],
      url: "https://tt-embed.com/video/" + btoa(messageLinks).split("/")[0],
      footer: {
        text: ""
        },
    };

    elements.push(
      <Embed
        embed={embed}
        renderDescription={() => (
          <TikVideo url={messageLinks}></TikVideo>
        )}
      />
    );

    return elements;
  }

  return null;
}
