class VideosController < ApplicationController

  def create
    @video = Mix.find!(slug: params[:mix_slug]).videos.create!(video_params)
  end

  def destroy
    Video.find(params[:id]).destroy!
    head :ok
  end

  private

  def video_params
    params.require(:video).permit(:url, :volume)
  end
end
