import { RECEIVE_CURRENT_PLAYLIST,
    RESET_CURRENT, 
} from "../actions/playlist_actions";

import { RECEIVE_CURRENT_ARTIST,
} from "../actions/artist_actions";

import { RECEIVE_CURRENT_ALBUM,
} from "../actions/album_actions";

// used for Playlist#show & Album#show
const currentItemReducer = (currItemState = {}, action) => {
    Object.freeze(currItemState) // currItemState is an object
    switch (action.type) {
        case RECEIVE_CURRENT_PLAYLIST:
            let currPlaylist = action.playlist;
            currPlaylist['source'] = "playlist";
            return currPlaylist;
        case RECEIVE_CURRENT_ARTIST:
            let currArtist = action.artist;
            currArtist['source'] = "artist";
            return currArtist;
        case RECEIVE_CURRENT_ALBUM:
            let currAlbum = action.album;
            currAlbum['source'] = "album";
            return currAlbum;
        case RESET_CURRENT:
            return {};
        default:
            return currItemState;
    }
}


export default currentItemReducer;