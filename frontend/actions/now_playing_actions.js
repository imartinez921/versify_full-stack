export const TOGGLE_PLAY = "TOGGLE_PLAY";
export const PUSH_PLAY = "PUSH_PLAY";
export const QUEUE_ARTIST = "QUEUE_ARTIST";
export const PLAY_ARTIST = "PLAY_ARTIST";

const togglePlay = () => ({
	type: TOGGLE_PLAY,
});

const pushPlay = () => ({
	type: PUSH_PLAY,
});

const queueArtist = (objToQueue) => ({
	//{allSongs:arr, sourceType:str, extractedUrlParams:numStr}
	type: QUEUE_ARTIST,
	allSongs: objToQueue.allSongs,
	sourceType: objToQueue.sourceType,
	extractedUrlParams: objToQueue.extractedUrlParams,
});

const playArtist = (objToQueue) => ({
	//{allSongs:arr, sourceType:str, extractedUrlParams:numStr}
	type: PLAY_ARTIST,
	allSongs: objToQueue.allSongs,
	sourceType: objToQueue.sourceType,
	extractedUrlParams: objToQueue.extractedUrlParams,
});

export const toTogglePlay = () => (dispatch) => dispatch(togglePlay());

export const toQueueArtist = (objToQueue) => (dispatch) => {
	return dispatch(queueArtist(objToQueue));
};

export const toPlayArtist = (objToQueue) => (dispatch) => {
	return dispatch(playArtist(objToQueue));
};

export const toPushPlay = () => (dispatch) => dispatch(pushPlay());
