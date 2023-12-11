# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


require 'open-uri'
User.create(username: 'userdemo', email: 'userdemo', birthday: 19900101, password: 'userdemo')

Playlist.create(title: 'My First Playlist', description: "I'm so excited", user_id: 1)
Playlist.create(title: 'NYC Go Easy On Me', description: "My love for Alicia Keys", user_id: 1)
Playlist.create(title: 'Splitscreen Sadness', description: "When the sadness is sad.", user_id: 1)

artists = [
    'Juls', 
    'Haile', 
    'Sauti Sol', 
    'Wizkid', 
    'JAEL', 
    'Jhene Aiko', 
    'John Legend', 
    'Koffee', 
    'Alicia Keys', 
    'Tems', 
    'Burna Boy'
]
artist_photos = [
    "https://versify-dev.s3.amazonaws.com/images/artists/avatar-juls.jpeg",
    "https://versify-dev.s3.amazonaws.com/images/artists/avatar-haile.jpeg",
    "https://versify-dev.s3.amazonaws.com/images/artists/avatar-sauti-sol.jpeg",
    "https://versify-dev.s3.amazonaws.com/images/artists/avatar-wizkid.jpeg",
    "https://versify-dev.s3.amazonaws.com/images/artists/avatar-jael.jpeg",
    "https://versify-dev.s3.amazonaws.com/images/artists/avatar-jhene-aiko.jpeg",
    "https://versify-dev.s3.amazonaws.com/images/artists/avatar-john-legend.jpeg",
    "https://versify-dev.s3.amazonaws.com/images/artists/avatar-koffee.jpeg",
    "https://versify-dev.s3.amazonaws.com/images/artists/avatar-alicia-keys.jpeg",
    "https://versify-dev.s3.amazonaws.com/images/artists/avatar-tems.jpeg",
    "https://versify-dev.s3.amazonaws.com/images/artists/avatar-burna-boy.jpeg",
]

# Seed artists in the database with corresponding image url
# Then create Artist instances and attach their artist photo
(0... artists.length).each do |i|
    Artist.create(
        name: artists[i], 
        photo_url: artist_photos[i],
        num_listeners: (rand * 50000000).floor
        
    )
end

albums = [
    {title: 'Sounds of My World', year: 2021, artist_id: 1, genre: 'Afrobeats'},
    {title: 'Time', year: 2018, artist_id: 5, genre: 'R&B'},
    {title: 'Trip', year: 2017, artist_id: 6, genre: 'R&B'},
    {title: 'Bigger Love', year: 2020, artist_id: 7, genre: 'R&B'},
    {title: 'Rapture EP', year: 2019, artist_id: 8, genre: 'Dancehall'},
    {title: 'KEYS', year: 2021, artist_id: 9, genre: 'R&B'},
    {title: 'For Broken Ears', year: 2020, artist_id: 10, genre: 'R&B'},
    {title: 'Made In Lagos', year: 2020, artist_id: 4, genre: 'Afrobeats'},
    {title: 'Twice As Tall', year: 2020, artist_id: 11, genre: 'Afrobeats'},
    {title: 'calm & patient', year: 2023, artist_id: 6, genre: 'R&B'}
]
album_photos = [
    "https://versify-dev.s3.amazonaws.com/images/albums/sounds-of-my-world.jpeg",
    "https://versify-dev.s3.amazonaws.com/images/albums/time.jpeg",
    "https://versify-dev.s3.amazonaws.com/images/albums/trip.jpeg",
    "https://versify-dev.s3.amazonaws.com/images/albums/bigger-love.jpeg",
    "https://versify-dev.s3.amazonaws.com/images/albums/rapture-ep.jpeg",
    "https://versify-dev.s3.amazonaws.com/images/albums/keys.jpeg",
    "https://versify-dev.s3.amazonaws.com/images/albums/for-broken-ears.jpeg",
    "https://versify-dev.s3.amazonaws.com/images/albums/made-in-lagos.jpeg",
    "https://versify-dev.s3.amazonaws.com/images/albums/twice-as-tall.jpeg",
    "https://versify-dev.s3.amazonaws.com/images/albums/calm-and-patient-art.jpeg",
]
(0...albums.length).each do |i|
    album = albums[i]
    album[:photo_url] = album_photos[i]
    Album.create(album)
end

# Trial songs to test case-insensitive ordering
# Song.create!(title:"Irene", album_id:5, tracknum:1, duration:90, audio_url:"google.com")
# Song.create!(title:"hold my love", album_id:2, tracknum:1, duration:52.seconds, audio_url:"google.com")

songs_data = [
    { title: "Makossa Riddim", album_id: 1, tracknum: 3, duration: 182, audio_url: "https://versify-dev.s3.amazonaws.com/audio/makossa-riddim.mp3", album_image_url: "https://versify-dev.s3.amazonaws.com/images/albums/sounds-of-my-world.jpeg" },
    { title: "Mare", album_id: 1, tracknum: 10, duration: 209, audio_url: "https://versify-dev.s3.amazonaws.com/audio/mare.mp3", album_image_url: "https://versify-dev.s3.amazonaws.com/images/albums/sounds-of-my-world.jpeg" },
    { title: "Close To Me", album_id: 1, tracknum: 1, duration: 180, audio_url: "https://versify-dev.s3.amazonaws.com/audio/close-to-me.mp3", album_image_url: "https://versify-dev.s3.amazonaws.com/images/albums/sounds-of-my-world.jpeg" },
    { title: "The Girl with the Tattoo - Miguel Cover", album_id: 2, tracknum: 1, duration: 209, audio_url: "https://versify-dev.s3.amazonaws.com/audio/the-girl-with-the-tattoo.mp3", album_image_url: "https://versify-dev.s3.amazonaws.com/images/albums/time.jpeg"},
    { title: "New Balance", album_id: 3, tracknum: 8, duration: 279,  audio_url: "https://versify-dev.s3.amazonaws.com/audio/new-balance.mp3", album_image_url: "https://versify-dev.s3.amazonaws.com/images/albums/trip.jpeg"},
    { title: "U Move, I Move (feat. Jhene Aiko)", album_id: 4, tracknum: 7, duration: 223, audio_url: "https://versify-dev.s3.amazonaws.com/audio/u-move-i-move.mp3", album_image_url: "https://versify-dev.s3.amazonaws.com/images/albums/bigger-love.jpeg"},
    { title: "Don't Walk Away (feat. Koffee)", album_id: 4, tracknum: 12, duration: 220,  audio_url: "https://versify-dev.s3.amazonaws.com/audio/dont-walk-away.mp3", album_image_url: "https://versify-dev.s3.amazonaws.com/images/albums/bigger-love.jpeg"},
    { title: "Toast", album_id: 5, tracknum: 2, duration: 191, audio_url: "https://versify-dev.s3.amazonaws.com/audio/toast.mp3", album_image_url: "https://versify-dev.s3.amazonaws.com/images/albums/rapture-ep.jpeg"},
    { title: "Like Water (Originals)", album_id: 6, tracknum: 13, duration: 237,  audio_url: "https://versify-dev.s3.amazonaws.com/audio/like-water.mp3", album_image_url: "https://versify-dev.s3.amazonaws.com/images/albums/keys.jpeg"},
    { title: "Free Mind", album_id: 7, tracknum: 3, duration: 247, audio_url: "https://versify-dev.s3.amazonaws.com/audio/free-mind.mp3", album_image_url: "https://versify-dev.s3.amazonaws.com/images/albums/for-broken-ears.jpeg"},
    { title: "Essence (feat. Tems)", album_id: 8, tracknum: 11, duration: 248, audio_url: "https://versify-dev.s3.amazonaws.com/audio/essence.mp3", album_image_url: "https://versify-dev.s3.amazonaws.com/images/albums/made-in-lagos.jpeg"},
    { title: "Time Flies (feat. Sauti Sol)", album_id: 9, tracknum: 11, duration: 224, audio_url: "https://versify-dev.s3.amazonaws.com/audio/time-flies.mp3", album_image_url: "https://versify-dev.s3.amazonaws.com/images/albums/twice-as-tall.jpeg"},
    { title: "Ginger (feat. Burna Boy)", album_id: 8, tracknum: 2, duration: 196, audio_url: "https://versify-dev.s3.amazonaws.com/audio/ginger.mp3", album_image_url: "https://versify-dev.s3.amazonaws.com/images/albums/made-in-lagos.jpeg"},
    { title: "calm & patient", album_id: 10, tracknum: 1, duration: 213, audio_url: "https://versify-dev.s3.amazonaws.com/audio/calm-and-patient.mp3", album_image_url: "https://versify-dev.s3.amazonaws.com/images/albums/calm-and-patient-art.jpeg"}
]

songs_data.each do |song_data|
    Song.create(song_data)
end


collabs = [
{song_id: 1, artist_id: 2},
{song_id: 2, artist_id: 3},
{song_id: 3, artist_id: 4},
{song_id: 3, artist_id: 5},
{song_id: 6, artist_id: 6},
{song_id: 7, artist_id: 8},
{song_id: 11, artist_id: 10},
{song_id: 12, artist_id: 3},
{song_id: 13, artist_id: 11},
]

collabs.each do |collab|
    Collab.create(collab)
end



# Seed Playlists
totalSongIds = songs_data.length
(1..3).each do |i| # Three playlists seeded to start
    (1..11).each do
        songId = rand(1..totalSongIds)
        playlistId = i
        Playlisted.create(song_id: songId, playlist_id: playlistId)
    end
    i += 1
end