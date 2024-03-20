import { connect } from "react-redux";
import { clearCurrent } from "../../actions/playlist_actions";
import { displayAlbum } from "../../actions/album_actions";
import { toPlayAlbum,
	toPushPlay,
	toTogglePlay,
	toPlayView,
} from "../../actions/now_playing_actions";

import AlbumShow from "./album_show";

const mapStateToProps = (
	// from state
	{ entities: { currentItem, songs, playlists, nowPlaying} },
	// from ownProps
	{ currentUser, params }
) => {
	return {
		currentAlbum: currentItem,
		tracks: songs,
		playlists: playlists,
		currentUser: currentUser,
		isPlaying: nowPlaying.isPlaying,
		currentQueueSource: nowPlaying.queueSources[nowPlaying.trackIndex],
		urlParams: params,
		source: "album",
		songCardDropdownItems: [
			{ title: "Play song", id: `${crypto.randomUUID()}` },
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
	toPlayView: (objToQueue) => dispatch(toPlayView(objToQueue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumShow);
