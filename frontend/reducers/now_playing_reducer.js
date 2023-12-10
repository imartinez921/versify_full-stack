import {
	QUEUE_ARTIST,
	PLAY_ARTIST,
	PUSH_PLAY,
} from "../actions/now_playing_actions";
import { TOGGLE_PLAY } from "../actions/now_playing_actions";

const nowPlayingReducer = (
	playState = {
		isPlaying: false,
		queue: [],
		queueSources: [],
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
		case PUSH_PLAY:
			if (newPlayState.queue?.length > 0) newPlayState.isPlaying = true;
			return newPlayState;
		case QUEUE_ARTIST:
			// Mutate the object so any currently playing track is not disrupted
			newPlayState.queue.push(...action.allSongs);
			// Track the origin view of each song in the queue
			for (let i = 0; i < action.allSongs.length; i++) {
				newPlayState.queueSources.push({
					sourceType: action.sourceType,
					extractedUrlParams: action.extractedUrlParams,
				});
			}
			// TODO: Consider separate key to hold current track
			// to continue playback for when user clears the queue
			console.log("NEW QUEUE", newPlayState.queue);
			return newPlayState;
		case PLAY_ARTIST:
			newPlayState.queue = action.allSongs; // Replace the entire queue
			newPlayState.queueSources=[]; // Reset queueSources for new queue
			for (let i = 0; i < action.allSongs.length; i++) {
				newPlayState.queueSources.push({
					sourceType: action.sourceType,
					extractedUrlParams: action.extractedUrlParams,
				});
			}
			console.log("NEW QUEUE", newPlayState.queue);
			return newPlayState;
			default:
				return playState;
		}
};

export default nowPlayingReducer;
