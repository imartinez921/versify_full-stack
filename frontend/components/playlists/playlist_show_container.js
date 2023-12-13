import { connect } from "react-redux";
import {
    displayPlaylist,
    fetchPlaylists,
    editPlaylist,
    destroyPlaylist,
    clearCurrent,
} from "../../actions/playlist_actions";
import {
    toTogglePlay,
    toQueuePlaylist,
    toPlayPlaylist,
    toPushPlay,
} from "../../actions/now_playing_actions";
import {
    openPlaylistNavDropdown,
    closePlaylistNavDropdown,
    openPlaylistEditModal,
    closePlaylistEditModal,
} from "../../actions/ux_actions";

import PlaylistShow from "./playlist_show";

const mapStateToProps = (
    // from state
    { ux, entities: { currentItem, playlists, songs, nowPlaying } },
    // from ownProps
    { params, history, currentUser }
) => {
    return {
        currentPlaylist: currentItem,
        playlists: playlists,
        playlistSongs: songs,
        isPlaying: nowPlaying.isPlaying,
        currentQueueSource: nowPlaying.queueSources[0],
        playlistNavDropdownState: ux.playlistNavDropdown,
        playlistEditModalState: ux.playlistEditModal,
        urlParams: params,
        currentUser: currentUser,
        history: history,
        source: "playlist",
        songCardDropdownItems: [
            {
                title: "Remove from this playlist",
            },
            {
                title: "Add to playlist",
                submenu: [
                    [
                        {
                            title: "Create new playlist",
                        },
                        ...playlists,
                        // Enclose array of playlists in an array since
                        // dropdown uses recursive .map function on items prop
                    ],
                ],
            },
        ],
    };
};

const mapDispatchToProps = (dispatch) => ({
	displayPlaylist: (playlistId) => dispatch(displayPlaylist(playlistId)),
	fetchPlaylists: (playlistId) => dispatch(fetchPlaylists(playlistId)),
	editPlaylist: (playlist, playlistId) =>
		dispatch(editPlaylist(playlist, playlistId)),
	destroyPlaylist: (playlistId) => dispatch(destroyPlaylist(playlistId)),
	clearCurrent: () => dispatch(clearCurrent()),
	toTogglePlay: () => dispatch(toTogglePlay()),
	toQueuePlaylist: (objToQueue) => dispatch(toQueuePlaylist(objToQueue)),
	toPlayPlaylist: (objToQueue) => dispatch(toPlayPlaylist(objToQueue)),
	toPushPlay: () => dispatch(toPushPlay()),
	openPlaylistNavDropdown: () => dispatch(openPlaylistNavDropdown()),
	closePlaylistNavDropdown: () => dispatch(closePlaylistNavDropdown()),
	openPlaylistEditModal: () => dispatch(openPlaylistEditModal()),
	closePlaylistEditModal: () => dispatch(closePlaylistEditModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistShow);
