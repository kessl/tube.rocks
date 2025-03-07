class Video < ApplicationRecord
  include ActionView::Helpers

  belongs_to :mix, optional: true

  validates :url, presence: true
  validates :yt_video_id, presence: { message: 'Please provide a valid URL to a YouTube video' }

  before_validation do
    self.yt_video_id = CGI::parse(URI::parse(url).query || '')['v'].first
  rescue URI::InvalidURIError
    self.errors.add(:url, 'Please enter a valid URL')
  end
end
