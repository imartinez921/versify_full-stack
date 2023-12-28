import React, { useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import PlaylistNavDropdown from "./playlist_nav_dropdown";

import { RxDotsHorizontal } from "react-icons/rx";
import {
	MdOutlinePlayCircleFilled,
	MdOutlinePauseCircleFilled,
} from "react-icons/md";

// Dropdown functionality using Redux actions
const PlaylistNav = ({
	currentPlaylist,
	playlistSongs,
	isPlaying,
	currentQueueSource,
	history,
	playlistNavDropdownState,
	playlistEditModalState,
	fetchPlaylists,
	editPlaylist,
	destroyPlaylist,
	toTogglePlay,
	toQueuePlaylist,
	toPlayPlaylist,
	toPushPlay,
	toPlayView,
	openPlaylistNavDropdown,
	closePlaylistNavDropdown,
	openPlaylistEditModal,
	closePlaylistEditModal,
}) => {
	useEffect(() => {
		if (!playlistNavDropdownState.isOpen)
			window.removeEventListener("click", closePlaylistNavDropdown);
	}, [playlistNavDropdownState]);

	const togglePlaylistNavDropdown = (event) => {
		event.preventDefault();
		playlistNavDropdownState.isOpen
			? closePlaylistNavDropdown()
			: openPlaylistNavDropdown();
	};

	const objToQueue = {
		playlistSongs,
		sourcedFrom: history.location.pathname,
	}; // provides linkback to view currently playing
	// TODO: Implement queue view

	const handleButtonClick = (e) => {
		e.preventDefault();
		if (
			!!currentQueueSource &&
			objToQueue.sourcedFrom === currentQueueSource.sourcedFrom
		) {
			toTogglePlay();
		} else {
			if (objToQueue.playlistSongs?.length > 0) {
				toPlayPlaylist(objToQueue);
				toPushPlay();
			}
		}
	};

	return (
		<>
			<div id="artist-play-button" onClick={handleButtonClick}>
				{isPlaying &&
				objToQueue.sourcedFrom === currentQueueSource?.sourcedFrom ? (
					<MdOutlinePauseCircleFilled />
				) : (
					<MdOutlinePlayCircleFilled />
				)}
			</div>
			<div
				id="playlist-dropdown-dots"
				onClick={togglePlaylistNavDropdown}
			>
				<RxDotsHorizontal />
			</div>
			{playlistNavDropdownState.isOpen ? (
				<PlaylistNavDropdown
					objToQueue={objToQueue}
					history={history}
					currentPlaylist={currentPlaylist}
					playlistSongs={playlistSongs}
					playlistNavDropdownState={playlistNavDropdownState}
					playlistEditModalState={playlistEditModalState}
					closePlaylistNavDropdown={closePlaylistNavDropdown}
					openPlaylistEditModal={openPlaylistEditModal}
					closePlaylistEditModal={closePlaylistEditModal}
					fetchPlaylists={fetchPlaylists}
					editPlaylist={editPlaylist}
					destroyPlaylist={destroyPlaylist}
					toQueuePlaylist={toQueuePlaylist}
					toPlayView={toPlayView}
				/>
			) : null}
		</>
	);
};

export default withRouter(PlaylistNav);
