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
import {
	toQueueView,
	toPlayArtist,
	toPlayView,
} from "../../actions/now_playing_actions";

import ArtistPageDropdown from "./artist_page_dropdown";

const mapStateToProps = (state, ownProps) => {
	;
	return {
		ref: ownProps.ref,
		history: ownProps.history,
		songs: state.entities.songs.allSongs,
		playlists: state.entities.playlists,
		currentItem: state.entities.currentItem,
		currentUser: state.entities.users[state.session.id],
		artistDropdownState: ownProps.artistDropdownState,
		updateArtistDropdownState: ownProps.updateArtistDropdownState,
		depthLevel: 0,
		items: [
			{ title: "Play artist", id: `${crypto.randomUUID()}` },
			{
				title: "Add to queue",
				id: `${crypto.randomUUID()}`,
				// No access to any other unique props in ArtistPageDropdown items.map
			},
			{
				title: "Add to playlist",
				id: `${crypto.randomUUID()}`,
				submenu: [
					{
						title: "Create new playlist",
						id: `${crypto.randomUUID()}`,
					},
					...state.entities.playlists,
					// Do not enclose array of playlists in an array since
					// we are not using recursive function here
				],
			},
		],
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
})(ArtistPageDropdown);
