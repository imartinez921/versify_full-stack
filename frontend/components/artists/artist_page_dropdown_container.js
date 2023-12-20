import { connect } from "react-redux";
import { toQueueArtist } from "../../actions/now_playing_actions";

import ArtistPageDropdown from "./artist_page_dropdown";

const mapStateToProps = (state, ownProps) => {
	debugger
	return {
		playlists: state.entities.playlists,
		selectedSong: state.entities.songs.allSongs,
		currentItem: state.entities.currentItem,
		currentUser: state.entities.users[state.session.id],
		handleAddToQueue: ownProps.handleAddToQueue,
		history: ownProps.history,
		artistPageDropdownState: ownProps.artistPageDropdownState,
		ref: ownProps.ref,
		toggleArtistPageDropdown: ownProps.toggleArtistPageDropdown,
		items: [
			{ title: "Play artist" },
			{
				title: "Add to playlist",
				submenu: [
					[
						{
							title: "Create new playlist",
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
	toQueueArtist: (objToQueue) => dispatch(toQueueArtist(objToQueue)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
	forwardRef: true,
})(ArtistPageDropdown);
