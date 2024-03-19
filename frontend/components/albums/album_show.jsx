import React, { useEffect, useRef } from "react";

import AlbumHeader from "./album_header";
import AlbumMenuBar from "./album_menu_bar";
import SongIndex from "../songs/song_index";

const AlbumShow = ({
	currentAlbum,
	tracks,
	playlists,
	currentUser,
	urlParams,
	isPlaying,
	currentQueueSource,
	source,
	songCardDropdownItems,
	displayAlbum,
	toPlayAlbum,
	toPushPlay,
	toTogglePlay,
	toPlayView,
	clearCurrent,
}) => {
	useEffect(() => {
		displayAlbum(urlParams.id);

		const rendered = document.getElementById("album-show");
		rendered ? rendered.scrollTo(0, 0) : null;

		return () => clearCurrent();
	}, [urlParams]); // Will run whenever urlParams.id changes, otherwise AlbumShow doesn't re-render
	// Passing this down from currentView bc wrapping withRouter doesn't always trigger useEffect

	const albumShowRef = useRef();

	const albumShow = (
		<div className="album-show" ref={albumShowRef}>
			<div className="album-header">
				<AlbumHeader album={currentAlbum} />
			</div>
			<div className="album-menu">
				<AlbumMenuBar
					currentUser={currentUser}
					isPlaying={isPlaying}
					currentQueueSource={currentQueueSource}
					tracks={tracks}
					playlists={playlists}
					toPlayAlbum={toPlayAlbum}
					toPushPlay={toPushPlay}
					toTogglePlay={toTogglePlay}
				/>
			</div>
			<SongIndex
				currentUser={currentUser}
				songs={tracks}
				source={source}
				songCardDropdownItems={songCardDropdownItems}
				currentViewRef={albumShowRef}
				toPlayView={toPlayView}
			/>
		</div>
	);
	return currentAlbum.albumPhotoUrl ? albumShow : null;
};

export default AlbumShow;
