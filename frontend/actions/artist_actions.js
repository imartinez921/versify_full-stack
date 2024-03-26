import { indexArtists, showArtist } from "../util/artists_util";

// ACTION TYPES
export const RECEIVE_ALL_ARTISTS = "RECEIVE_ALL_ARTISTS";
export const RECEIVE_CURRENT_ARTIST = "RECEIVE_CURRENT_ARTIST";

// THUNK ACTIONS
const receiveAllArtists = (artists) => {
	return {
		type: RECEIVE_ALL_ARTISTS,
		artists,
	};
};

const receiveCurrentArtist = (artistObj) => {
	// debugger;
	return {
		type: RECEIVE_CURRENT_ARTIST, // multiple data types because fetched with associations
		artist: artistObj.artist,
		albums: artistObj.albums,
		collabSongs: artistObj.collab_songs,
		allSongs: [...artistObj.tracks, ...artistObj.collab_songs],
	};
};

// THUNK ACTION CREATORS
export const fetchArtists = () => (dispatch) => (
	indexArtists().then((artists) => dispatch(receiveAllArtists(artists))),
	(err) => dispatch(receiveArtistErrors(err.responseJSON))
);

export const displayArtist = (artistId) => (dispatch) => (
	showArtist(artistId).then((artist) =>
		dispatch(receiveCurrentArtist(artist))
	),
	(err) => dispatch(receiveArtistErrors(err.responseJSON))
);
