import { postPlaylisted,
    deletePlaylisted
} from "../util/playlisteds_util";
import { displayPlaylist, fetchPlaylists,
} from "./playlist_actions";


// Action types
export const RECEIVE_NEW_PLAYLISTED = "RECEIVE_NEW_PLAYLISTED";
export const REMOVE_PLAYLISTED = "REMOVE_PLAYLISTED";

// Thunk Actions


// Thunk Action creators
export const createNewPlaylisted = ( songId, playlistId ) => dispatch => {
    return postPlaylisted( songId, playlistId )
        .then( (playlistId) => dispatch( displayPlaylist(playlistId) ),
            err => (console.log(err)) 
        )
}

export const removePlaylisted = (playlistedId) => dispatch => {
    return deletePlaylisted(playlistedId)
        .then ( (respObj) => {
                dispatch( displayPlaylist(respObj.playlistId) );
                dispatch( fetchPlaylists() );
            }, err => (dispatch( receivePlaylistErrors(err.responseJSON) )) 
        )
};