import { connect } from "react-redux";
import { clearCurrent } from "../../actions/playlist_actions";
import { displayAlbum } from "../../actions/album_actions";
import { toPlayAlbum,
	toPushPlay,
	toTogglePlay,
} from "../../actions/now_playing_actions";

import AlbumShow from "./album_show";

const mapStateToProps = (
	// from state
	{ entities: { currentItem, songs, playlists, nowPlaying} },
	// from ownProps
	{ params, history, currentUser }
) => {
	return {
		currentAlbum: currentItem,
		tracks: songs,
		playlists: playlists,
		urlParams: params,
		history: history,
		currentUser: currentUser,
		isPlaying: nowPlaying.isPlaying,
		currentQueueSource: nowPlaying.queueSources[0],
		source: "album",
		songCardDropdownItems: [
			{ title: "Add to queue", id: `${crypto.randomUUID()}` },
			{
				title: "Add to playlist", id: `${crypto.randomUUID()}` ,
				submenu: [
					[
						{
							title: "Create new playlist", id: `${crypto.randomUUID()}` ,
						},
						...playlists,
						// Enclose array of playlists in an array since dropdown uses recursive .map function on items prop
					],
				],
			},
		],
	};
};

const mapDispatchToProps = (dispatch) => ({
	displayAlbum: (albumId) => dispatch(displayAlbum(albumId)),
	toPlayAlbum: (objToQueue) => dispatch(toPlayAlbum(objToQueue)),
	toPushPlay: () => dispatch(toPushPlay()),
	toTogglePlay: () => dispatch(toTogglePlay()),
	clearCurrent: () => dispatch(clearCurrent()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumShow);
