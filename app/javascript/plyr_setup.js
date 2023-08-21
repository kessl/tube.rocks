import Plyr from 'plyr'

const youtubeIframeUrl = (source) => `https://www.youtube.com/embed/${source}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`

function createPlayer(target) {
  const ytVideoId = target.dataset.ytVideoId
  const iframe = document.createElement('iframe')
  iframe.src = youtubeIframeUrl(ytVideoId)

  const wrapper = document.createElement('div')
  wrapper.classList.add('player', 'plyr__video-embed')
  wrapper.appendChild(iframe)

  target.appendChild(wrapper)
  const player = new Plyr(wrapper, {
    controls: [
      'play-large', // The large play button in the center
      'play', // Play/pause playback
      'progress', // The progress bar and scrubber for playback and buffering
      'current-time', // The current time of playback
      'duration', // The full duration of the media
      'captions', // Toggle captions
    ],
  })
  player.on('ready', () => {
    const volume = Number(target.dataset.volume)
    player.volume = volume / 100.0
  })
  player.on('ended', () => {
    player.restart()
  })
  return player
}

function syncPlayback(players) {
  players.forEach(player => {
    player.on('playing', () => {
      if (players.some(player => player.loading)) return
      for (const otherPlayer of players) {
        if (player === otherPlayer) continue
        otherPlayer.play()
      }
    })
    player.on('pause', () => {
      for (const otherPlayer of players) {
        if (player === otherPlayer) continue
        otherPlayer.pause()
      }
    })
  })
}

function initPlayers() {
  const targets = document.querySelectorAll('[data-yt-video-id]')
  const players = [...targets].map(createPlayer)
  syncPlayback(players)
}

window.addEventListener('load', initPlayers)
window.initPlayers = initPlayers
