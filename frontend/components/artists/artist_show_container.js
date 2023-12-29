import { connect } from "react-redux";
import { displayArtist } from "../../actions/artist_actions";
import { displayAlbum } from "../../actions/album_actions";
import {
	toTogglePlay,
	toPlayArtist,
	toPushPlay,
} from "../../actions/now_playing_actions";

import { clearCurrent } from "../../actions/playlist_actions";

import ArtistShow from "./artist_show";

const mapStateToProps = (state, ownProps) => {
	return {
		currentArtist: state.entities.currentItem,
		albums: state.entities.albums,
		allSongs: state.entities.songs.allSongs,
		collabSongs: state.entities.songs.collabSongs,
		isPlaying: state.entities.nowPlaying.isPlaying,
		currentQueueSource: state.entities.nowPlaying.queueSources[state.entities.nowPlaying.trackIndex],
		currentUser: ownProps.currentUser,
		urlParams: ownProps.params,
	};
};

const mapDispatchToProps = (dispatch) => ({
	displayArtist: (artistId) => dispatch(displayArtist(artistId)),
	displayAlbum: (albumId) => dispatch(displayAlbum(albumId)),
	toTogglePlay: () => dispatch(toTogglePlay()),
	toPlayArtist: (objToQueue) => dispatch(toPlayArtist(objToQueue)),
	toPushPlay: () => dispatch(toPushPlay()),
	clearCurrent: () => dispatch(clearCurrent()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistShow);
