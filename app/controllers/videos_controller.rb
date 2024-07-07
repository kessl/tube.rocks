class VideosController < ApplicationController
  layout false

  def new
    video = Video.new(video_params)
    video.valid?
    render partial: 'partials/video', locals: { video: }
  end

  private

  def video_params
    params.permit(:url, :volume)
  end
end
