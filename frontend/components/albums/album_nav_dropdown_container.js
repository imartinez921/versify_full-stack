import { connect } from "react-redux";

import {
	removePlaylisted,
	createNewPlaylisted,
} from "../../actions/playlisted_actions";
import {
	createPlaylist,
	displayPlaylist,
	fetchPlaylists,
} from "../../actions/playlist_actions";
import { toQueueView, toPlayAlbum } from "../../actions/now_playing_actions";
import AlbumNavDropdown from "./album_nav_dropdown";

const mapStateToProps = (state, ownProps) => {
	// Relocate each instance of recursive SongCardDrodpown
	if (ownProps.depthLevel === 1) nextLeft -= 100; //submenu div is wider
	return {
		ref: ownProps.ref,
		history: ownProps.history,
		songs: state.entities.songs,
		playlists: state.entities.playlists,
		selectedSong: state.entities.songs,
		currentItem: state.entities.currentItem,
		currentUser: state.entities.users[state.session.id],
		albumNavDropdownState: ownProps.albumNavDropdownState,
		updateAlbumNavDropdownState: ownProps.updateAlbumNavDropdownState,
		items: ownProps.items,
		depthLevel: 0,
		submenuState: ownProps.submenuState,
	};
};

const mapDispatchToProps = (dispatch) => ({
	removePlaylisted: (playlistedId) =>
		dispatch(removePlaylisted(playlistedId)),
	createNewPlaylisted: (songId, playlistId) =>
		dispatch(createNewPlaylisted(songId, playlistId)),
	createPlaylist: (playlist) => dispatch(createPlaylist(playlist)),
	displayPlaylist: (playlistId) => dispatch(displayPlaylist(playlistId)),
	fetchPlaylists: (userId) => dispatch(fetchPlaylists(userId)),
	toQueueView: (objToQueue) => dispatch(toQueueView(objToQueue)),
	toPlayAlbum: (objToQueue) => dispatch(toPlayAlbum(objToQueue)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
	forwardRef: true,
})(AlbumNavDropdown);
