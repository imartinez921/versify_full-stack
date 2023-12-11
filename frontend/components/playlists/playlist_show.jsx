import React, { useEffect, useRef } from "react";
import PlaylistHeader from "./playlist_header";
import PlaylistInfo from "./playlist_info";
import PlaylistNav from "./playlist_nav";
import SongIndex from "../songs/song_index";
import PlaylistArt from "./playlist-art";

const PlaylistShow = ({
	currentPlaylist,
	playlists,
	playlistSongs,
	urlParams,
	currentUser,
	history,
	source,
	songCardDropdownItems,
	displayPlaylist,
	clearCurrent,
	...props
}) => {
	const { id, title, description } = currentPlaylist;

	// Upon mount: fetch playlist from database based on urlParams :id
	// Upon dismount: clear currentItem slice of state
	useEffect(() => {
		displayPlaylist(urlParams.id);
		// Maybe there's a way to check whether the urlParams.id has changed from the previous and then trigger re-render

		return () => clearCurrent();
	}, [urlParams]);

	const playlistShowRef = useRef();

	const playlistShow = title ? (
		<div className="playlist-show" ref={playlistShowRef}>
			<PlaylistHeader>
				<PlaylistArt>{playlistSongs}</PlaylistArt>
				<PlaylistInfo
					title={title}
					description={description}
					currentUser={currentUser}
				/>
			</PlaylistHeader>
			<div className="playlist-nav">
				<PlaylistNav
					currentPlaylist={currentPlaylist}
					history={history}
					{...props}
				/>
			</div>
			<SongIndex
				currentUser={currentUser}
				playlists={playlists}
				songs={playlistSongs}
				history={history}
				urlParams={urlParams}
				source={source}
				songCardDropdownItems={songCardDropdownItems}
				currentViewRef={playlistShowRef}
			/>
		</div>
	) : null;

	return title ? playlistShow : null;
};

export default PlaylistShow;
