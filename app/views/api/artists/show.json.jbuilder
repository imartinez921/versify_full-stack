json.artist do
    json.partial! "api/artists/artist", artist: @artist
end

json.albums do
    json.array! @artist.albums.each do |album|
        json.extract! album, :id, :title, :year
        json.albumPhotoUrl album.photo_url
    end
end

json.tracks do
    @artist.albums.each do |album|
        json.array! album.tracks.each do |song|
            json.partial!("api/songs/song", song: song)
        end
    end
end

json.collab_songs do
    json.array! @artist.collab_songs.each do |song|
        json.partial!("api/songs/song", song: song)
    end
end