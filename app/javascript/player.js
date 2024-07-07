import reportPlayback from 'reportPlayback'

const players = {}
let played = false

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

async function initPlayers() {
  const targets = document.querySelectorAll('[data-yt-video-id]')

  return Promise.all([...targets].map(target => {
    return new Promise((resolve, reject) => {
      const videoId = target.dataset.ytVideoId
      if (players[videoId] !== undefined){
        resolve()
        return
      }

      players[videoId] = new YT.Player(videoId, {
        events: {
          onReady: (event) => {
            event.target.setVolume(target.dataset.volume)
            resolve()
          },
          onStateChange: onPlayerStateChange(videoId),
        }
      })
    })
  }))
}

function getVolumes() {
  return Object.fromEntries(
    Object.entries(players)
          .map(([videoId, player]) => [videoId, player.getVolume()])
  )
}

window.onYouTubeIframeAPIReady = function() {
  initPlayers()
}

window.initPlayers = initPlayers
window.getVolumes = getVolumes
