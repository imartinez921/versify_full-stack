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
import { toQueueView, toPlayArtist } from "../../actions/now_playing_actions";

import ArtistPageDropdown from "./artist_page_dropdown";

const mapStateToProps = (state, ownProps) => {
	return {
		playlists: state.entities.playlists,
		songs: state.entities.songs.allSongs,
		currentItem: state.entities.currentItem,
		history: ownProps.history,
		artistPageDropdownState: ownProps.artistPageDropdownState,
		ref: ownProps.ref,
		toggleArtistPageDropdown: ownProps.toggleArtistPageDropdown,
		items: [
			{ title: "Play artist", id: `${crypto.randomUUID()}` },
			{
				title: "Add to playlist",
				id: `${crypto.randomUUID()}`,
				submenu: [
					[
						{
							title: "Create new playlist",
							id: `${crypto.randomUUID()}`,
						},
						...state.entities.playlists,
						// Enclose array of playlists in an array since
						// dropdown uses recursive .map function on items prop
					],
				],
			},
			{
				title: "Add to queue",
				id: `${crypto.randomUUID()}`,
				// No access to any other unique props in ArtistPageDropdown items.map
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
	toPlayArtist: (objToQueue) => dispatch(toPlayArtist(objToQueue)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
	forwardRef: true,
})(ArtistPageDropdown);
