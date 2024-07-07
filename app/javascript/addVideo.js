window.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.js-add-video')?.addEventListener('click', addVideo)
})

function addVideo(event) {
  event.preventDefault()
  document.querySelector('.js-video.hidden')?.classList?.remove('hidden')
  if (!document.querySelector('.js-video.hidden')) {
    document.querySelector('.js-add-video')?.classList?.add('hidden')
  }
}
