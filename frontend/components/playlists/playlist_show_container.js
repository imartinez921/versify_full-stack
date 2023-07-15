import { connect } from "react-redux";
import { displayPlaylist,
    fetchPlaylists,
    editPlaylist,
    destroyPlaylist,
    clearCurrent,
} from "../../actions/playlist_actions";
import { openPlaylistNavDropdown,
    closePlaylistNavDropdown,
    openPlaylistEditModal,
    closePlaylistEditModal,
 } from "../../actions/ui_actions";

import PlaylistShow from "./playlist_show";

const mapStateToProps = ({
    ui, entities: { currentItem, playlists, songs} // from state
    }, { params, history, currentUser, // from ownProps
}) => {
    return {
        currentPlaylist: currentItem,
        urlParams: params,
        currentUser: currentUser,
        history: history,
        playlists: playlists,
        playlistSongs: songs,
        currentUser: currentUser,
        playlistNavDropdownState: ui.playlistNavDropdown,
        playlistEditModalState: ui.playlistEditModal,
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
                            title: "Create new playlist"
                        },
                        ...playlists,
                    // Enclose array of playlists in an array since dropdown uses recursive .map function on items prop
                    ]
                ],
            },
        ],
    };
}

const mapDispatchToProps = (dispatch) => ({
    displayPlaylist: (playlistId) => dispatch( displayPlaylist(playlistId) ),
    fetchPlaylists: (playlistId) => dispatch( fetchPlaylists(playlistId) ),
    editPlaylist: (playlist, playlistId) => dispatch( editPlaylist(playlist, playlistId) ),
    destroyPlaylist: (playlistId) => dispatch( destroyPlaylist(playlistId) ),
    clearCurrent: () => dispatch( clearCurrent() ),
    openPlaylistNavDropdown: () => dispatch( openPlaylistNavDropdown() ),
    closePlaylistNavDropdown: () => dispatch( closePlaylistNavDropdown() ),
    openPlaylistEditModal: () => dispatch( openPlaylistEditModal() ),
    closePlaylistEditModal: () => dispatch( closePlaylistEditModal() ),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistShow);