module ApplicationHelper
  def origin
    request.base_url
  end

  def embed_url(video)
    "http://www.youtube.com/embed/#{video.yt_video_id}?enablejsapi=1&origin=#{origin}&playsinline=1"
  end
end
