import Plyr from 'plyr'

window.addEventListener('load', function() {
  const players = []
  const containers = document.querySelectorAll('.player')
  containers.forEach(el => {
    const player = new Plyr(el, {
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
      debug: true,
      source: {
        type: 'video',
        sources: [
          {
            src: 'agarhXlrhnc',
            provider: 'youtube',
          },
        ],
      }
    })
    players.push(player)
  })

  for (const player of players) {
    player.on('ready', function(event) {
      console.log('ready', event.detail.plyr)
      if (navigator.getAutoplayPolicy('mediaelement') === 'allowed') {
        player.play()
      }
    })
    player.on('playing', function(event) {
      console.log(player.elements.original.dataset.id, player.loading)
      if (players.some(player => player.loading)) return;

      for (const otherPlayer of players) {
        // otherPlayer.currentTime = 0
        if (player === otherPlayer) continue;
        otherPlayer.play()
      }
    })
    player.on('pause', function(event) {
      for (const otherPlayer of players) {
        if (player === otherPlayer) continue;
        otherPlayer.pause()
      }
    })
  }
})
