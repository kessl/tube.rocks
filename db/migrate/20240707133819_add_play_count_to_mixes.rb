class AddPlayCountToMixes < ActiveRecord::Migration[7.0]
  def change
    add_column :mixes, :play_count, :integer, null: false, default: 0
  end
end
