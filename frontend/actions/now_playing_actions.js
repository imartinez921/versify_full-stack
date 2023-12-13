export const TOGGLE_PLAY = "TOGGLE_PLAY";
export const PUSH_PLAY = "PUSH_PLAY";
export const QUEUE_ARTIST = "QUEUE_ARTIST";
export const PLAY_ARTIST = "PLAY_ARTIST";
export const QUEUE_PLAYLIST = "QUEUE_PLAYLIST";
export const PLAY_PLAYLIST = "PLAY_PLAYLIST";

const togglePlay = () => ({
	type: TOGGLE_PLAY,
});

const pushPlay = () => ({
	type: PUSH_PLAY,
});

const queueArtist = (objToQueue) => ({
	//{allSongs:arr, sourceType:str, extractedUrlParams:numStr}
	type: QUEUE_ARTIST,
	songs: objToQueue.allSongs,
	sourceType: objToQueue.sourceType,
	extractedUrlParams: objToQueue.extractedUrlParams,
});

const queuePlaylist = (objToQueue) => ({
	//{playlistSongs:arr, sourceType:str, extractedUrlParams:numStr}
	type: QUEUE_PLAYLIST,
	songs: objToQueue.playlistSongs,
	sourceType: objToQueue.sourceType,
	extractedUrlParams: objToQueue.extractedUrlParams,
});

const playArtist = (objToQueue) => ({
	//{allSongs:arr, sourceType:str, extractedUrlParams:numStr}
	type: PLAY_ARTIST,
	songs: objToQueue.allSongs,
	sourceType: objToQueue.sourceType,
	extractedUrlParams: objToQueue.extractedUrlParams,
});

const playPlaylist = (objToQueue) => ({
	//{playlistSongs:arr, sourceType:str, extractedUrlParams:numStr}
	type: PLAY_PLAYLIST,
	songs: objToQueue.playlistSongs,
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

export const toQueuePlaylist = (objToQueue) => (dispatch) => {
	debugger
	return dispatch(queuePlaylist(objToQueue));
};

export const toPlayPlaylist = (objToQueue) => (dispatch) => {
	return dispatch(playPlaylist(objToQueue));
};

export const toPushPlay = () => (dispatch) => dispatch(pushPlay());
