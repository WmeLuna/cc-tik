import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";
import { constants as Constants } from "@cumcord/modules/common";
import React, {useState, useEffect} from 'react';

import TikVideo from "./VideoPlayer";

const MESSAGE_LINK_REGEX = /https?:\/\/(?:\w+\.)?tiktok?\.com\/.*/g;

const Embed = findByDisplayName("Embed");

export default function TikTokPreviewAccessory(props) {
  const { message } = props;
  const messageLinks = message.content.match(MESSAGE_LINK_REGEX);

  if (messageLinks) {
    const elements = [];
    let [author, setAuthor] = useState("Tiktok")
    let [authorPFP, setAuthorPFP] = useState("https://sf16-sg.tiktokcdn.com/obj/eden-sg/uvkuhyieh7lpqpbj/pwa/512x512.png")
    let [footer, setFooter] = useState("")
    let [loaded, setLoaded] = useState(false)
    let embed = {
      rawDescription: "",
      color: "#7401d3",
      provider: {
        name: "TikTok Embed",
      },
      author: {
        name: author,
        iconProxyURL: authorPFP
      },
      footer: {
        text: footer
      },
    };
    useEffect(() => {
      if (!loaded) {
      fetch("https://www.tikwm.com/api/?url=" + messageLinks)
      .then(data => data.json())
      .then(data => {
        setAuthor(data.data.author.nickname + " (@" +data.data.author.unique_id + ")");
        setAuthorPFP(data.data.author.avatar)
        setFooter(data.data.title)
        setLoaded(true)
      })
      console.log(loaded)
    }
    })

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
