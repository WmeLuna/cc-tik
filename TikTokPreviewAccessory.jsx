import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";

const MESSAGE_LINK_REGEX = /https?:\/\/(?:\w+\.)?tiktok?\.com\/.*/g;

const Embed = findByDisplayName("Embed");
const { renderVideoComponent, renderImageComponent, renderMaskedLinkComponent,} = findByProps("renderImageComponent");
const HTTP = findByProps("get", "put");

export default function TikTokPreviewAccessory(props) {
  const { message } = props;
  const messageLinks = message.content.match(MESSAGE_LINK_REGEX);

  if (messageLinks) {
    const elements = [];
    //https://www.tiktok.com/oembed?url=
    let tikjson;
    HTTP.get({
      url: "https://www.tiktok.com/oembed?url=" + messageLinks
    }).then((res) => {
      console.log(res.body)
      res.body = tikjson
    })
    elements.push(
      <Embed
        embed={{
          //type: "video",
          rawDescription: "",
          color: "#7401d3",
          author: {
            name: "TikTok Embed",
          },
          feilds: [],
          thumbnail: {
            url: "https://sf16-sg.tiktokcdn.com/obj/eden-sg/uvkuhyieh7lpqpbj/pwa/512x512.png",
          },
          video: {
            height: 300,
            width: 400,
            proxyURL: "https://tt-embed.com/video/" + btoa(messageLinks).split("/")[0],
            url: "https://tt-embed.com/video/" + btoa(messageLinks).split("/")[0],
          },
          url: "https://tt-embed.com/video/" + btoa(messageLinks).split("/")[0],
          footer: {
            text:
              "Video URL is \n" +
              "https://tt-embed.com/video/" +
              String(btoa(messageLinks).split("/")[0]),
          },
        }}
        renderImageComponent={renderImageComponent}
        renderLinkComponent={renderMaskedLinkComponent}
        renderVideoComponent={renderVideoComponent}
        renderDescription={() => (
          <div>
            <span>Test</span>
          </div>
        )}
      />
    );
    console.log(elements[0].props);
    console.log(tikjson)
    return elements;
  }

  return null;
}
