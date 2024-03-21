import { connect } from "react-redux";
import Player from "./player";

import {
	toPlayView,
	toTogglePlay,
	toPushPlay,
	toNextTrack,
	toPrevTrack,
	toClearQueue,
} from "../../actions/now_playing_actions";

const mapStateToProps = (state, ownProps) => {
	return {
		currentUser: state.entities.users[state.session.id],
		errors: state.entities.errors,
		isPlaying: state.entities.nowPlaying.isPlaying,
		currentTrack: state.entities.nowPlaying.queue[state.entities.nowPlaying.trackIndex],
		trackIndex: state.entities.nowPlaying.trackIndex,
		queueSources: state.entities.nowPlaying.queueSources,
		songs: state.entities.songs, // songs of the current view
		hasQueue: state.entities.nowPlaying.queue.length > 0,
	};
};

const mapDispatchToProps = (dispatch) => ({
	toNextTrack: () => dispatch(toNextTrack()),
	toPrevTrack: () => dispatch(toPrevTrack()),
	toPlayView: (objToQueue) => dispatch(toPlayView(objToQueue)),
	toTogglePlay: () => dispatch(toTogglePlay()),
	toPushPlay: () => dispatch(toPushPlay()),
	toClearQueue: () => dispatch(toClearQueue()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
