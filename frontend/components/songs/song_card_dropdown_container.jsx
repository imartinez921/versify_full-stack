import { connect } from "react-redux";

import {
	removePlaylisted,
	createNewPlaylisted,
} from "../../actions/playlisted_actions";
import {
	fetchPlaylists,
	createPlaylist,
	displayPlaylist,
} from "../../actions/playlist_actions";
import { toQueueView,
	toPlayView, 
} from "../../actions/now_playing_actions";

import SongCardDropdown from "./song_card_dropdown";

const mapStateToProps = (state, ownProps) => {
	// Relocate each instance of recursive SongCardDrodpown
	const { left, top } = ownProps.dropdownPosition;
	let nextLeft = left - 165; // Width needed to clear first div and appear to the left
	if (ownProps.depthLevel === 1) nextLeft -= 100; //submenu div is wider
	const nextTop = top - 50; // Offset height for staggered display
	return {
		currentItem: state.entities.currentItem,
		playlists: state.entities.playlists,
		ref: ownProps.ref,
		history: ownProps.history,
		currentUser: ownProps.currentUser,
		selectedSong: ownProps.selectedSong,
		songCardDropdownState: ownProps.songCardDropdownState,
		updateSongCardDropdownState: ownProps.updateSongCardDropdownState,
		updateDropdownPosition: ownProps.updateDropdownPosition,
		items: ownProps.items, // already contains current playlists from SongIndex
		depthLevel: ownProps.depthLevel,
		dropdownPosition: { left: nextLeft, top: nextTop },
		submenuState: ownProps.submenuState,
	};
};

const mapDispatchToProps = (dispatch) => ({
	removePlaylisted: (playlistedId) =>
		dispatch(removePlaylisted(playlistedId)),
	createNewPlaylisted: (songId, playlistId) =>
		dispatch(createNewPlaylisted(songId, playlistId)),
	fetchPlaylists: () => dispatch(fetchPlaylists()),
	createPlaylist: (playlist) => dispatch(createPlaylist(playlist)),
	displayPlaylist: (playlistId) => dispatch(displayPlaylist(playlistId)),
	toQueueView: (objToQueue) => dispatch(toQueueView(objToQueue)),
	toPlayView: (objToQueue) => dispatch(toPlayView(objToQueue)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
	forwardRef: true,
})(SongCardDropdown);
