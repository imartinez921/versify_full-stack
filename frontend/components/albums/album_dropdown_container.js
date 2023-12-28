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
import { toQueueView, toPlayView } from "../../actions/now_playing_actions";
import AlbumDropdown from "./album_dropdown";

const mapStateToProps = (state, ownProps) => {
	return {
		songs: state.entities.songs,
		playlists: state.entities.playlists,
		currentItem: state.entities.currentItem,
		currentUser: state.entities.users[state.session.id],
		ref: ownProps.ref,
		history: ownProps.history,
		albumDropdownState: ownProps.albumDropdownState,
		updateAlbumDropdownState: ownProps.updateAlbumDropdownState,
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
	toPlayView: (objToQueue) => dispatch(toPlayView(objToQueue)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
	forwardRef: true,
})(AlbumDropdown);
