import {
	QUEUE_ARTIST,
	PLAY_ARTIST,
	QUEUE_PLAYLIST,
	PLAY_PLAYLIST,
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
	let newPlayState = {
		...playState,
		queue: [...playState.queue],
		queueSources: [...playState.queueSources],
	}
	// Rectifies issues with shallow copies where nested objs kept the same refs
	switch (action.type) {
		case TOGGLE_PLAY:
			if (newPlayState.queue?.length > 0)
				newPlayState.isPlaying = !newPlayState.isPlaying;
			return newPlayState;
		case PUSH_PLAY:
			if (newPlayState.queue?.length > 0) newPlayState.isPlaying = true;
			return newPlayState;
		case QUEUE_ARTIST:
		case QUEUE_PLAYLIST:
			// Mutate the object so any currently playing track is not disrupted
			newPlayState.queue.push(...action.songs);
			// Track the origin view of each song in the queue
			for (let i = 0; i < action.songs.length; i++) {
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
		case PLAY_PLAYLIST:
			debugger
			newPlayState.queue = action.songs; // Replace the entire queue
			newPlayState.queueSources=[]; // Reset queueSources for new queue
			for (let i = 0; i < action.songs.length; i++) {
				newPlayState.queueSources = newPlayState.queueSources.concat([
					{
						sourceType: action.sourceType,
						extractedUrlParams: action.extractedUrlParams,
					},
				]);
			}
			console.log("NEW QUEUE", newPlayState.queue);
			return newPlayState;
			default:
				return playState;
		}
};

export default nowPlayingReducer;
