import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";
import { constants as Constants } from "@cumcord/modules/common";

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
      },
      feilds: [],
      url: "https://tt-embed.com/video/" + btoa(messageLinks).split("/")[0],
      footer: {
        text: ""
        },
    };

    let videosrc1 = "https://tt-embed.com/video/" + btoa(messageLinks).split("/")[0]
    let videosrc2 = String(messageLinks).replace("tiktok","fftiktok")
    elements.push(
      <Embed
        embed={embed}
        renderDescription={() => (
          <div>
            <video controls class="CC-Video" width="100%" height="400">
              <source src={videosrc1}></source>
              <source src={videosrc2}></source>
            </video>
          </div>
        )}
      />
    );

    console.log(elements[0].props);
    return elements;
  }

  return null;
}
