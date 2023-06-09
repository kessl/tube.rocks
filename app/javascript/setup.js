import Plyr from 'plyr'

const youtubeIframeUrl = (source) => `https://www.youtube.com/embed/${source}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`

export const createIframes = (sources) => {
  const iframes = sources.map(source => {
    const iframe = document.createElement('iframe')
    iframe.src = youtubeIframeUrl(source)
    return iframe
  })

  const target = document.querySelector('.js-players')
  return iframes.map((iframe, idx) => {
    const wrapper = document.createElement('div')
    wrapper.classList.add('player', 'plyr__video-embed')
    wrapper.dataset.id = idx
    wrapper.appendChild(iframe)
    target.appendChild(wrapper)
    return wrapper
  })
}

export const createPlayers = (elements) => elements.map(el =>
  new Plyr(el, {
    controls: [
      'play-large', // The large play button in the center
      'restart', // Restart playback
      'rewind', // Rewind by the seek time (default 10 seconds)
      'play', // Play/pause playback
      'fast-forward', // Fast forward by the seek time (default 10 seconds)
      'progress', // The progress bar and scrubber for playback and buffering
      'current-time', // The current time of playback
      'duration', // The full duration of the media
      'volume', // Volume control
      'captions', // Toggle captions
      'settings', // Settings menu
    ],
  })
)
