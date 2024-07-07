window.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.js-submit-mix')?.addEventListener('click', submitMix)
})

async function submitMix(event) {
  event.preventDefault()
  const videosContainer = document.querySelector('.js-videos-container')
  const form = videosContainer.closest('form')
  if (!form.checkValidity()) {
    form.reportValidity()
    return
  }

  await window.initPlayers()
  Object.entries(window.getVolumes()).forEach(([videoId, volume]) => {
    const videoElement = document.querySelector(`[data-yt-video-id='${videoId}']`).closest('.js-video')
    const videoIndex = Array.prototype.indexOf.call(videosContainer.children, videoElement)
    const volumeInput = document.createElement('input')
    volumeInput.type = 'hidden'
    volumeInput.name = `mix[videos_attributes][${videoIndex}][volume]`
    volumeInput.value = volume
    videoElement.appendChild(volumeInput)
  })

  form.submit()
}
