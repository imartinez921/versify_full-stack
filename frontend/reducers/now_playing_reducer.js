import { QUEUE_ARTIST } from "../actions/now_playing_actions";
import { TOGGLE_PLAY } from "../actions/now_playing_actions";

const nowPlayingReducer = (
	playState = {
		isPlaying: false,
		queue: [],
		queueSource: { type: null, id: null },
	},
	action
) => {
	Object.freeze(playState);
	let newPlayState = Object.assign({}, playState);
	switch (action.type) {
		case TOGGLE_PLAY:
			if (newPlayState.queue?.length > 0)
				newPlayState.isPlaying = !newPlayState.isPlaying;
			return newPlayState;
		case QUEUE_ARTIST: // payload is an array of song objects
			newPlayState.queue.push(...action.songs);
			// mutate the object so the player does not stop playing to re-render
			newPlayState.queueSource = { type: artist, id: action.urlParams };
		default:
			return playState;
	}
};

export default nowPlayingReducer;
