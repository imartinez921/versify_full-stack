if @playlists != nil
    @playlists.each do |playlist|
        json.set! playlist.id do
            json.extract! playlist, :title
        end
    end
end