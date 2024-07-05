const players = {}

const onPlayerReady = (volume) => (event) => {
  console.log('ready', event)
  event.target.setVolume(volume)
}

function syncPlayers(targetVideoId, targetState) {
  const otherPlayers = Object.entries(players).filter(([videoId, _]) => videoId !== targetVideoId)
  if (targetState === YT.PlayerState.BUFFERING || targetState === YT.PlayerState.PLAYING) {
    otherPlayers.forEach(([_, player]) => {
      player.playVideo()
    })
  }
  if (targetState === YT.PlayerState.PAUSED) {
    otherPlayers.forEach(([_, player]) => {
      player.pauseVideo()
    })
  }
}

const onPlayerStateChange = (videoId) => (event) => {
  console.log('state change', event.target.id, window.states[event.data] ?? event.data)
  console.log('syncing')
  syncPlayers(videoId, event.data)
}

function initPlayers() {
  const targets = document.querySelectorAll('[data-yt-video-id]')

  targets.forEach(target => {
    const videoId = target.dataset.ytVideoId
    players[videoId] = new YT.Player(videoId, {
      events: {
        onReady: onPlayerReady(target.dataset.volume),
        onStateChange: onPlayerStateChange(videoId),
      }
    })
  })

  console.log(players)
}

window.onYouTubeIframeAPIReady = function() {
  console.log('onYouTubeIframeAPIReady')
  window.states = {
    [YT.PlayerState.ENDED]: 'YT.PlayerState.ENDED',
    [YT.PlayerState.PLAYING]: 'YT.PlayerState.PLAYING',
    [YT.PlayerState.PAUSED]: 'YT.PlayerState.PAUSED',
    [YT.PlayerState.BUFFERING]: 'YT.PlayerState.BUFFERING',
    [YT.PlayerState.CUED]: 'YT.PlayerState.CUED',
  }
  initPlayers()
}
