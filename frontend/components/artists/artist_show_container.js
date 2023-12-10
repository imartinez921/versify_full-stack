import { connect } from "react-redux";
import { displayArtist } from "../../actions/artist_actions";
import { displayAlbum } from "../../actions/album_actions";
import {
	toTogglePlay,
	toQueueArtist,
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
		currentQueueSource: state.entities.nowPlaying.queueSources[0], // = {sourceType:, urlParams:}
		urlParams: ownProps.params,
		path: ownProps.path,
		currentUser: ownProps.currentUser,
		history: ownProps.history,
	};
};

const mapDispatchToProps = (dispatch) => ({
	displayArtist: (artistId) => dispatch(displayArtist(artistId)),
	displayAlbum: (albumId) => dispatch(displayAlbum(albumId)),
	toTogglePlay: () => dispatch(toTogglePlay()),
	toQueueArtist: (queueObj) => dispatch(toQueueArtist(queueObj)),
	toPlayArtist: (queueObj) => dispatch(toPlayArtist(queueObj)),
	toPushPlay: () => dispatch(toPushPlay()),
	clearCurrent: () => dispatch(clearCurrent()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistShow);
