class Video < ApplicationRecord
  belongs_to :mix

  validates :url, presence: true
  validates :yt_video_id, presence: { message: 'Please provide a valid YouTube video URL' }

  before_validation do
    self.yt_video_id = CGI::parse(URI::parse(url).query || '')['v'].first
  end
end
