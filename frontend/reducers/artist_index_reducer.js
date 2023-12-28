import { RECEIVE_ALL_ARTISTS,
} from "../actions/artist_actions";
import { LOGOUT_CURRENT_USER } from "../actions/session_actions";


const artistIndexReducer = (artistsState = [], action) => {
    Object.freeze(artistsState);
    switch (action.type) {
        case RECEIVE_ALL_ARTISTS:
            return action.artists;
        case LOGOUT_CURRENT_USER:
            return [];
        default:
            return artistsState;
    }
}

export default artistIndexReducer;