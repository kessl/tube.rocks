class MixesController < ApplicationController

  def new
    @mix = Mix.new
    2.times { @mix.videos.build }
  end

  def index
    @mixes = Mix.all
  end

  def show
    @mix = Mix.includes(:videos).find_by(slug: params[:slug])
    return not_found if @mix.blank?
  end

  def create
    @mix = Mix.new(mix_params)

    if @mix.save
      redirect_to mix_path(slug: @mix.slug), notice: "Mix was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def mix_params
    params.require(:mix).permit(videos_attributes: [:url, :volume])
  end
end
