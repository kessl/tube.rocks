import Plyr from 'plyr'

const youtubeIframeUrl = (source) => `https://www.youtube.com/embed/${source}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`

export const createIframes = (videos) => {
  return videos.map(video => {
    const iframe = document.createElement('iframe')
    iframe.src = youtubeIframeUrl(video.yt_video_id)

    const wrapper = document.createElement('div')
    wrapper.classList.add('player', 'plyr__video-embed')
    wrapper.dataset.yt_video_id = video.yt_video_id
    wrapper.appendChild(iframe)

    const target = document.querySelector(`#player-${video.yt_video_id}`)
    target.appendChild(wrapper)
    return {
      ...video,
      element: wrapper,
    }
  })
}

export const createPlayers = (videos) =>
  videos.map(video => {
    const player = new Plyr(video.element, {
      controls: [
        'play-large', // The large play button in the center
        'play', // Play/pause playback
        'progress', // The progress bar and scrubber for playback and buffering
        'current-time', // The current time of playback
        'duration', // The full duration of the media
        'captions', // Toggle captions
      ],
    })
    return {
      ...video,
      player,
    }
  }
)

window.addEventListener('load', function() {
  const videos = createPlayers(createIframes(window.cfg.videos))

  for (const video of videos) {
    const player = video.player
    player.on('ready', function(event) {
      player.volume = video.volume / 100.0
    })
    player.on('playing', function(event) {
      if (videos.some(video => video.player.loading)) return

      for (const otherVideo of videos) {
        if (video.id === otherVideo.id) continue
        otherVideo.player.play()
      }
    })
    player.on('pause', function(event) {
      for (const otherVideo of videos) {
        if (video.id === otherVideo.id) continue
        otherVideo.player.pause()
      }
    })
    player.on('ended', function(event) {
      player.restart()
    })
  }
})
