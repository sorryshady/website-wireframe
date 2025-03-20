"use client";

interface EmbedProps {
  url: string;
  type: "youtube" | "twitter" | "github" | "codepen";
}

export function Embed({ url, type }: EmbedProps) {
  const renderEmbed = () => {
    switch (type) {
      case "youtube":
        const videoId = url.match(
          /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
        )?.[1];
        if (!videoId) return null;
        return (
          <div className="relative w-full aspect-video my-8">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-lg"
            />
          </div>
        );

      case "twitter":
        return (
          <div className="my-8">
            <blockquote
              className="twitter-tweet"
              data-conversation="none"
              data-theme="dark"
            >
              <a href={url}>Loading tweet...</a>
            </blockquote>
            <script async src="https://platform.twitter.com/widgets.js" />
          </div>
        );

      case "github":
        return (
          <div className="my-8">
            <iframe
              src={url}
              className="w-full h-[500px] rounded-lg border border-gray-700"
              allowFullScreen
            />
          </div>
        );

      case "codepen":
        const penId = url.match(/codepen\.io\/[^\/]+\/pen\/([^\/]+)/)?.[1];
        if (!penId) return null;
        return (
          <div className="my-8">
            <iframe
              height="500"
              style={{ width: "100%" }}
              scrolling="no"
              src={`https://codepen.io/embed/${penId}?default-tab=result&editable=true&theme-id=dark`}
              allowFullScreen
              className="rounded-lg border border-gray-700"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return renderEmbed();
}
