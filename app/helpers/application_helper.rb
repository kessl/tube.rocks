module ApplicationHelper
  def yt_video_id(url)
    CGI::parse(URI::parse(url.presence || '').query || '')['v'].first
  end
end
