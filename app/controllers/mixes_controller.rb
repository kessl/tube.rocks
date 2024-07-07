class MixesController < ApplicationController
  def index
    @most_played = Mix.limit(10)
  end

  def show
    @mix = Mix.includes(:videos).find_by!(slug: params[:slug])
  end

  def new
    base_mix = Mix.includes(:videos).find_by(slug: params[:from])
    if base_mix.present?
      @mix = Mix.new({ name: base_mix.name,
                                videos_attributes: base_mix.videos.map { { url: _1.url, volume: _1.volume } } })
    else
      @mix = Mix.new
      @mix.videos.build
      @mix.videos.build
    end
  end

  def create
    base_mix = Mix.find_by(slug: params[:from])
    if base_mix.present?
      @mix = Mix.create!({ name: base_mix.name,
                           videos_attributes: base_mix.videos.map { { url: _1.url, volume: _1.volume } } })
    else
      @mix = Mix.create!(mix_params)
    end
    redirect_to mix_path(slug: @mix.slug)
  end

  def update
    @mix = Mix.includes(:videos).find_by!(slug: params[:slug])
    if @mix.update!(mix_params)
      redirect_to mix_path(slug: @mix.slug), notice: "You successfully created a mix!"
    else
      @errors = (@mix.errors.to_hash[:'videos.yt_video_id'] || []) + @mix.errors.full_messages_for(:name)
      redirect_to mix_path(slug: @mix.slug)
    end
  end

  private

  def mix_params
    params.require(:mix).permit(:name, videos_attributes: [:url, :volume])
  end
end
