import { connect } from "react-redux";
import Player from "./player";

import { toTogglePlay } from "../../actions/now_playing_actions";

const mapStateToProps = (state, ownProps) => {
	return {
		currentUser: state.entities.users[state.session.id],
		errors: state.entities.errors,
		// matchObj is a prop passed down by AuthRoute
		// matchObj = {params, path, url} as keys
		path: ownProps.path,
		history: ownProps.history,
		tracks: state.entities.nowPlaying.queue,
		length: state.entities.nowPlaying.queue.length,
		isPlaying: state.entities.nowPlaying.isPlaying,
	};
};

const mapDispatchToProps = (dispatch) => ({
	clearPlaylistErrors: () => dispatch(clearPlaylistErrors()),
	toTogglePlay: () => dispatch(toTogglePlay()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
