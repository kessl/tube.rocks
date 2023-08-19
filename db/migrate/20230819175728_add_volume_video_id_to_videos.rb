class AddVolumeVideoIdToVideos < ActiveRecord::Migration[7.0]
  def change
    add_column :videos, :yt_video_id, :string, null: false
    add_column :videos, :volume, :integer, null: false, default: 100
  end
end
