class MixesController < ApplicationController

  def new
    base_mix = Mix.find_by(slug: params[:slug])
    if base_mix.present?
      @mix = Mix.new({ name: base_mix.name,
                       videos_attributes: base_mix.videos.map { { url: _1.url, volume: _1.volume } } })
    else
      @mix = Mix.new
    end
  end

  def index
    @mixes = Mix.all
  end

  def show
    @mix = Mix.includes(:videos).find_by!(slug: params[:slug])
  end

  def create
    @mix = Mix.new(mix_params)

    if @mix.save
      redirect_to mix_path(slug: @mix.slug), notice: "Mix was successfully created."
    else
      @errors = (@mix.errors.to_hash[:'videos.yt_video_id'] || []) + @mix.errors.full_messages_for(:name)
      render :new, status: :unprocessable_entity
    end
  end

  private

  def mix_params
    params.require(:mix).permit(:name, videos_attributes: [:url, :volume])
  end
end
