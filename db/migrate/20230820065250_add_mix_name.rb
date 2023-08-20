class AddMixName < ActiveRecord::Migration[7.0]
  def change
    add_column :mixes, :name, :string, null: false
  end
end
