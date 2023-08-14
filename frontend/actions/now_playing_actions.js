export const PLAY_ARTIST = 'PLAY_ARTIST'
export const PLAY_ALBUM = 'PLAY_ALBUM'
export const PLAY_PLAYLIST = 'PLAY_PLAYLIST'
export const SHUFFLE_ARTIST = 'SHUFFLE_ARTIST'
export const SHUFFLE_ALBUM = 'SHUFFLE_ALBUM'
export const SHUFFLE_PLAYLIST = 'SHUFFLE_PLAYLIST'

const playArtist = () => ({
    type: PLAY_ARTIST,
})

const playAlbum = () => ({
    type: PLAY_ALBUM,
})

const playPlaylist = () => ({
    type: PLAY_PLAYLIST,
})
