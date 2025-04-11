// import { CldVideoPlayer } from 'next-cloudinary';
// import 'next-cloudinary/dist/cld-video-player.css';
const getEmbedUrl = (url) => {
  let videoId;

  if (url.includes("youtube.com/watch?v=")) {
    // Handle standard YouTube video URL
    videoId = url.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }
  } else if (url.includes("youtube.com/shorts/")) {
    // Handle YouTube Shorts URL
    videoId = url.split("shorts/")[1];
  } else {
    return url;
  }

  return `https://www.youtube.com/embed/${videoId}?modestbranding=1&iv_load_policy=0&showsearch=0&rel=0`;
};

const YoutubeEmbed = ({ url, title }) => {
  return (
    <div className="overflow-hidden pb-[56.25%] relative h-0 rounded-[13.95px]">
      <iframe
        width="853"
        height="469.74"
        src={getEmbedUrl(url)}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        title={title}
        className="absolute left-0 top-0 h-full w-full cursor-pointer"
      />
    </div>
  );
};
export default YoutubeEmbed;
