class Video < ApplicationRecord
  belongs_to :mix

  validates :url, presence: true
end
