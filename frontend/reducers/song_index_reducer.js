import { RECEIVE_CURRENT_PLAYLIST,
    RESET_CURRENT,
} from "../actions/playlist_actions";
import { RECEIVE_CURRENT_ARTIST,
} from "../actions/artist_actions";
import { RECEIVE_CURRENT_ALBUM,
} from "../actions/album_actions";
import { LOGOUT_CURRENT_USER,
} from "../actions/session_actions";


const songIndexReducer = (songsState = [], action) => {
    Object.freeze(songsState);
    switch (action.type) {
        case RECEIVE_CURRENT_PLAYLIST:
            return action.playlistSongs;
        case RECEIVE_CURRENT_ARTIST:
            return {
				allSongs: action.allSongs,
				collabSongs: action.collabSongs,
			};
        case RECEIVE_CURRENT_ALBUM:
            return action.songs;
        case LOGOUT_CURRENT_USER:
        case RESET_CURRENT:
            return [];
        default:
            return songsState;
    }
}

export default songIndexReducer;