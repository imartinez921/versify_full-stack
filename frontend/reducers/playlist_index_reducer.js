import { RECEIVE_ALL_PLAYLISTS,
} from "../actions/playlist_actions";
import { LOGOUT_CURRENT_USER,
} from "../actions/session_actions";


const playlistIndexReducer = (playlistsState = [], action) => {
    Object.freeze(playlistsState); // playlistsState is an array
    switch (action.type) {
        case RECEIVE_ALL_PLAYLISTS:
            return action.playlists;
        case LOGOUT_CURRENT_USER:
            return [];
        default:
            return playlistsState;
    }
}

export default playlistIndexReducer;