import reportPlayback from 'reportPlayback'

const players = {}
let played = false

const onPlayerReady = (volume) => (event) => {
  event.target.setVolume(volume)
}

function syncPlayers(targetVideoId, targetState) {
  const otherPlayers = Object.entries(players).filter(([videoId, _]) => videoId !== targetVideoId)
  if (targetState === YT.PlayerState.BUFFERING || targetState === YT.PlayerState.PLAYING) {
    otherPlayers.forEach(([_, player]) => {
      player.playVideo()
      if (!played) {
        reportPlayback()
        played = true
      }
    })
  }
  if (targetState === YT.PlayerState.PAUSED) {
    otherPlayers.forEach(([_, player]) => {
      player.pauseVideo()
    })
  }
}

const onPlayerStateChange = (videoId) => (event) => {
  syncPlayers(videoId, event.data)
}

function initPlayers() {
  const targets = document.querySelectorAll('[data-yt-video-id]')

  targets.forEach(target => {
    const videoId = target.dataset.ytVideoId
    if (players[videoId] !== undefined) return
    players[videoId] = new YT.Player(videoId, {
      events: {
        onReady: onPlayerReady(target.dataset.volume),
        onStateChange: onPlayerStateChange(videoId),
      }
    })
  })
}

window.onYouTubeIframeAPIReady = function() {
  initPlayers()
}

window.initPlayers = initPlayers
