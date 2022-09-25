import { useRef, useState } from "React";

export default function TikVideo(props) {
  /*
  https://stackoverflow.com/a/68464299
  Still New to React ngl so ty to this
  */
  const { url } = props;
  const videoRef = useRef();
  const pauseRef = useRef();
  const [progress, setProgress] = useState(0);
  const toggleVideo = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }
  const handleProgress = (e) => {
    if (isNaN(e.target.duration))
      return;
    setProgress((e.target.currentTime / e.target.duration) * 100);
  };
  let anim = null; 
  let pos = 0;
  const onPlay = () => {
    pauseRef.current.style.visibility = "hidden"
  }
  const onPause = () => {
    pauseRef.current.style.visibility = "visible"
    clearInterval(anim);
    anim = setInterval(frame, 5);
    function frame() {
      if (pos == 25) {
        clearInterval(anim);
        pauseRef.current.style.opacity = ""
        pos = 0
      } else {
        pos++; 
        pauseRef.current.style.opacity = pos * 4 + "%" 
      }
    }
  }

  let videosrc1 = "https://tt-embed.com/video/" + btoa(url).split("/")[0];
  let videosrc2 = String(url).replace("tiktok", "fftiktok");


  return (
    <div className="CC-Tik">
      <div className="CC-VidWrap">
      <video
        loop
        onTimeUpdate={handleProgress}
        onPlay={onPlay}
        onPause={onPause}
        onClick={toggleVideo}
        class="CC-Video"
        height="400"
        ref={videoRef}
      >
        <source src={videosrc1}></source>
        <source src={videosrc2}></source>
      </video>
      <div className="CC-Pause" ref={pauseRef} onClick={toggleVideo} >
        <svg aria-hidden="true" role="img" width="50" height="50" viewBox="0 0 24 24"><polygon fill="currentColor" points="0 0 0 14 11 7" transform="translate(7 5)"></polygon></svg>
      </div>
      </div>
      <div className="CC-Prog">
        <div className="CC-ProgTime" style={{width: `${progress}%`}}></div>
      </div>
    </div>
  );
}
