import React, { useEffect, useRef } from "react";

import AlbumHeader from "./album_header";
import AlbumNav from "./album_nav";
import SongIndex from "../songs/song_index";

const AlbumShow = ({
	currentAlbum,
	tracks,
	playlists,
	urlParams,
	history,
	currentUser,
	source,
	songCardDropdownItems,
	displayAlbum,
	clearCurrent,
}) => {
	useEffect(() => {
		displayAlbum(urlParams.id);

		const rendered = document.getElementById("album-show");
		rendered ? rendered.scrollTo(0, 0) : null;

		return () => clearCurrent();
	}, [urlParams]); // Will run whenever urlParams.id changes, otherwise ArtistShow doesn't re-render

	const albumShowRef = useRef();

	const albumShow = (
		<div className="album-show" ref={albumShowRef}>
			<div className="album-header">
				<AlbumHeader album={currentAlbum} history={history} />
			</div>
			<div className="album-nav">
				<AlbumNav
					currentUser={currentUser}
					tracks={tracks}
					playlists={playlists}
					history={history}
				/>
			</div>
			<SongIndex
				currentUser={currentUser}
				songs={tracks}
				history={history}
				source={source}
				songCardDropdownItems={songCardDropdownItems}
				currentViewRef={albumShowRef}
			/>
		</div>
	);
	return currentAlbum.albumPhotoUrl ? albumShow : null;
};

export default AlbumShow;
