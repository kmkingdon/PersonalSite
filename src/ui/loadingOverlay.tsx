'use client'

const loadingGif = "https://cdn.dribbble.com/users/1373613/screenshots/5465294/media/40164ab4165fa9edf629083472f93dac.gif";
export default function loadingOverlay({message}:{message:string}) {
    return (
      <div className="overflow-hidden w-full h-full flex flex-wrap justify-center items-center bg-[image:var(--image-url)] bg-center" style={{'--image-url': `url(${loadingGif})`}  as React.CSSProperties}>
        <span className="text-xl text-white">
          {message}
        </span>
      </div>
    )
  }