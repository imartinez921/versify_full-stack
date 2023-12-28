import React, { useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";

import ArtistHeader from "./artist_header";
import AlbumIndex from "../albums/album_index";
import ArtistMenuBar from "./artist_menu_bar";
import CollabSongIndex from "../songs/collab_song_index";

const ArtistShow = ({
	currentArtist,
	albums,
	allSongs,
	collabSongs,
	isPlaying,
	currentQueueSource,
	urlParams,
	history, // prop object from withRouter
	displayArtist,
	displayAlbum,
	toTogglePlay,
	toPlayArtist,
	toPushPlay,
	clearCurrent,
}) => {
	useEffect(() => {
		displayArtist(urlParams.id);

		const rendered = document.getElementById("artist-show");
		rendered ? rendered.scrollTo(0, 0) : null;

		return () => {
			clearCurrent();
		};
	}, [urlParams]); // Will run whenever urlParams.id changes, otherwise ArtistShow doesn't re-render
	// Passing this down from currentView bc wrapping withRouter doesn't always trigger useEffect

	const artistShowRef = useRef();
	const artistShow = (
		<>
			<div
				className="artist-show-background"
				style={{
					backgroundImage: `url(${currentArtist.photoUrl})`,
				}}
			>
				<div className="artist-show" ref={artistShowRef}>
					<div className="artist-header">
						<ArtistHeader currentArtist={currentArtist} />
					</div>
					<div className="artist-menu">
						<ArtistMenuBar
							artistShowRef={artistShowRef}
							allSongs={allSongs}
							isPlaying={isPlaying}
							currentQueueSource={currentQueueSource}
							history={history}
							toTogglePlay={toTogglePlay}
							toPlayArtist={toPlayArtist}
							toPushPlay={toPushPlay}
						/>
					</div>
					{albums?.length > 0 && (
						<AlbumIndex
							albums={albums}
							displayAlbum={displayAlbum}
						/>
					)}
					{collabSongs?.length > 0 && (
						<CollabSongIndex
							songs={collabSongs}
							displayAlbum={displayAlbum}
							currentArtist={currentArtist}
						/>
					)}
				</div>
			</div>
		</>
	);

	return currentArtist.photoUrl && artistShow;
};

export default withRouter(ArtistShow);
