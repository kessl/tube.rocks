export default async function() {
  const slug = document.querySelector('[data-mix]')?.dataset?.mix
  if (!slug) return
  const headers = { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content') }
  fetch(`/mixes/${slug}/play`, { method: 'POST', headers })
}
