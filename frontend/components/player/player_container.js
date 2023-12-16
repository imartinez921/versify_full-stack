import { connect } from "react-redux";
import Player from "./player";

import {
	toPlayView,
	toTogglePlay,
	toPushPlay,
} from "../../actions/now_playing_actions";

const mapStateToProps = (state, ownProps) => {
	return {
		currentUser: state.entities.users[state.session.id],
		errors: state.entities.errors,
		tracks: state.entities.nowPlaying.queue,
		songs: state.entities.songs, // songs of the current view
		isPlaying: state.entities.nowPlaying.isPlaying,
		hasQueue: state.entities.nowPlaying.queue.length > 0,
		// matchObj is a prop passed down by AuthRoute
		// matchObj = {params, path, url} as keys
		pathname: ownProps.history.location.pathname,
		history: ownProps.history,
	};
};

const mapDispatchToProps = (dispatch) => ({
	clearPlaylistErrors: () => dispatch(clearPlaylistErrors()),
	toPlayView: (objToQueue) => dispatch(toPlayView(objToQueue)),
	toTogglePlay: () => dispatch(toTogglePlay()),
	toPushPlay: () => dispatch(toPushPlay()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
