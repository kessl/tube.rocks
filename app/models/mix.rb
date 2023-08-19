class Mix < ApplicationRecord
  has_many :videos, dependent: :destroy

  accepts_nested_attributes_for :videos

  after_validation(on: :create) do
    self.slug = SecureRandom.alphanumeric(6).downcase
  end

  before_validation do
    self.videos = videos.select { _1.url.present? }
  end
end
