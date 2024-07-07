class MixesController < ApplicationController
  def index
    @most_played = Mix.includes(:videos).order(play_count: :desc).limit(10)
    expires_in 5.minutes, public: true
  end

  def show
    @mix = Mix.includes(:videos).find_by!(slug: params[:slug])
  end

  def new
    base_mix = Mix.includes(:videos).find_by(slug: params[:from])
    if base_mix.present?
      @mix = Mix.new({ name: base_mix.name,
                                videos_attributes: base_mix.videos.map { { url: _1.url, volume: _1.volume } } })
      (5 - base_mix.videos.count).times { @mix.videos.build }
    else
      @mix = Mix.new
      5.times { @mix.videos.build }
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

  def play
    mix = Mix.find_by(slug: params[:slug])
    mix.increment!(:play_count)
    head :no_content
  end

  private

  def mix_params
    params.require(:mix).permit(:name, videos_attributes: [:url, :volume])
  end
end
