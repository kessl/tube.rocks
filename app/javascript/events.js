export const registerEvents = (players) => {
  for (const player of players) {
    player.on('ready', function(event) {
      console.log('ready', event.detail.plyr)
      if (navigator.getAutoplayPolicy('mediaelement') === 'allowed') {
        player.play()
      }
    })
    player.on('playing', function(event) {
      console.log(player.elements.original.dataset.id, player.loading)
      if (players.some(player => player.loading)) return

      for (const otherPlayer of players) {
        if (player === otherPlayer) continue
        otherPlayer.play()
      }
    })
    player.on('pause', function(event) {
      for (const otherPlayer of players) {
        if (player === otherPlayer) continue
        otherPlayer.pause()
      }
    })
  }
}
