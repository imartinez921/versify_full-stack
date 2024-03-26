import {
	QUEUE_ARTIST,
	PLAY_ARTIST,
	QUEUE_PLAYLIST,
	QUEUE_VIEW,
	PLAY_PLAYLIST,
	PLAY_ALBUM,
	PUSH_PLAY,
	PLAY_VIEW,
	NEXT_TRACK,
	PREV_TRACK,
	CLEAR_QUEUE,
} from "../actions/now_playing_actions";
import { TOGGLE_PLAY } from "../actions/now_playing_actions";
import { LOGOUT_CURRENT_USER } from "../actions/session_actions";

const nowPlayingReducer = (
	playState = {
		isPlaying: false,
		trackIndex: 0,
		queue: [],
		queueSources: [],
	},
	action
) => {
	Object.freeze(playState);
	let newPlayState = {
		...playState,
		queue: [...playState.queue],
		queueSources: [...playState.queueSources],
	};
	// Above rectifies issues with shallow copies where nested objs kept the same refs
	switch (action.type) {
		case NEXT_TRACK:
			newPlayState.trackIndex++;
			if (newPlayState.trackIndex >= newPlayState.queue.length) {
				newPlayState.trackIndex = null;
				newPlayState.isPlaying = false;
				newPlayState.queue = [];
				newPlayState.queueSources = [];
			}
			return newPlayState;
		case PREV_TRACK:
			newPlayState.trackIndex--;
			if (newPlayState.trackIndex < 0) {
				newPlayState.trackIndex = null;
				newPlayState.isPlaying = false;
				newPlayState.queue = [];
				newPlayState.queueSources = [];
			}
			return newPlayState;
		case TOGGLE_PLAY:
			if (newPlayState.queue?.length > 0)

				newPlayState.isPlaying = !newPlayState.isPlaying;
			return newPlayState;
		case PUSH_PLAY:
			if (newPlayState.queue?.length > 0) newPlayState.isPlaying = true;
			return newPlayState;
		case QUEUE_ARTIST:
		case QUEUE_PLAYLIST:
		case QUEUE_VIEW:
			// Mutate the object so any currently playing track is not disrupted
			newPlayState.queue.push(...action.songs);
			// Track the origin view of each song in the queue
			for (let i = 0; i < action.songs.length; i++) {
				newPlayState.queueSources.push({
					sourcedFrom: action.sourcedFrom,
				});
			}
			console.log("NEW QUEUE", newPlayState.queue);
			return newPlayState;
		case PLAY_ARTIST:
		case PLAY_PLAYLIST:
		case PLAY_ALBUM:
		case PLAY_VIEW:
			newPlayState.queue = action.songs; // Replace the entire queue
			newPlayState.queueSources = []; // Reset queueSources for new queue
			for (let i = 0; i < action.songs.length; i++) {
				newPlayState.queueSources.push({
					sourcedFrom: action.sourcedFrom,
				});
			}
			newPlayState.isPlaying = true;
			newPlayState.trackIndex = 0;
			console.log("NEW QUEUE", newPlayState.queue);
			return newPlayState;
		case CLEAR_QUEUE:
			newPlayState.queue = [];
			newPlayState.queueSources = [];
			newPlayState.trackIndex = null;
			return newPlayState;
		case LOGOUT_CURRENT_USER:
			newPlayState.isPlaying = false;
			newPlayState.queue = [];
			newPlayState.queueSources = [];
			return newPlayState;
		default:
			return playState;
	}
};

export default nowPlayingReducer;
