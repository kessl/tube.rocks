class Video < ApplicationRecord
  belongs_to :mix

  validates :url, presence: true
  validates :yt_video_id, presence: { message: 'Please provide a valid URL to a YouTube video' }

  before_validation do
    self.yt_video_id = yt_video_id(url)
  end
end
