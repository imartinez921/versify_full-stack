class Playlisted < ApplicationRecord
    after_create :update_playlist
    validates :playlist_id, :song_id, presence: true

    belongs_to :playlist,
    foreign_key: :playlist_id,
    class_name: :Playlist

    belongs_to :song,
    foreign_key: :song_id,
    class_name: :Song
    
    def update_playlist
        playlist = Playlist.find(self.playlist_id)
        playlist.update_attributes(updated_at: Time.now)
    end 
end
