class AddNumListenersToArtists < ActiveRecord::Migration[5.2]
  def change
    add_column :artists, :num_listeners, :integer, null:false
  end
end
