import {
    postPlaylist,
    patchPlaylist,
    showPlaylist,
    indexPlaylists,
    deletePlaylist,
} from "../util/playlists_util";

export const RESET_CURRENT = "RESET_CURRENT";
export const RECEIVE_CURRENT_PLAYLIST = "RECEIVE_CURRENT_PLAYLIST";
export const RECEIVE_ALL_PLAYLISTS = "RECEIVE_ALL_PLAYLISTS";
export const RECEIVE_PLAYLIST_ERRORS = "RECEIVE_PLAYLIST_ERRORS";
export const RESET_PLAYLIST_ERRORS = "RESET_PLAYLIST_ERRORS";

// export const clearPlaylistErrors = () => dispatch => (
//     dispatch(resetPlaylistErrors())
// );

export const clearCurrent = () => (dispatch) => dispatch(resetCurrent());

export const fetchPlaylists = () => (dispatch) =>
    indexPlaylists().then(
        (playlists) => dispatch(receiveAllPlaylists(playlists)),
        (err) => dispatch(receivePlaylistErrors(err.responseJSON))
    );

export const createPlaylist = (defaultPlaylist) => (dispatch) => {
    return postPlaylist(defaultPlaylist).then(
        (respObj) => {
            dispatch(fetchPlaylists());
            return respObj.playlist.id;
        },
        (err) => dispatch(receivePlaylistErrors(err.responseJSON))
    );
};

export const displayPlaylist = (playlistId) => (dispatch) => {
    debugger
    return showPlaylist(playlistId).then(
        (playlist) => dispatch(receiveCurrentPlaylist(playlist)),
        // (err) => dispatch(receivePlaylistErrors(err.responseJSON))
        (err) => console.log(err))
    // err => (console.log(err)) )
};

export const editPlaylist = (playlist, playlistId) => (dispatch) => {
    return patchPlaylist(playlist, playlistId).then(
        (playlist) => {
            dispatch(fetchPlaylists());
            dispatch(receiveCurrentPlaylist(playlist));
        },
        (err) => dispatch(receivePlaylistErrors(err.responseJSON))
    );
};

export const destroyPlaylist = (playlistId) => (dispatch) =>
    deletePlaylist(playlistId).then(
        () => dispatch(fetchPlaylists()),
        (err) => dispatch(receivePlaylistErrors(err.responseJSON))
    );

const resetCurrent = () => ({
    type: RESET_CURRENT,
});

const receivePlaylistErrors = (errors) => ({
    type: RECEIVE_PLAYLIST_ERRORS,
    errors: errors,
});

const resetPlaylistErrors = () => ({
    type: RESET_PLAYLIST_ERRORS,
});

const receiveCurrentPlaylist = (playlistObj) => {
    return {
        type: RECEIVE_CURRENT_PLAYLIST,
        playlist: playlistObj.playlist,
        playlistSongs: playlistObj.songs,
    };
};

const receiveAllPlaylists = (playlists) => ({
    type: RECEIVE_ALL_PLAYLISTS,
    playlists,
});
