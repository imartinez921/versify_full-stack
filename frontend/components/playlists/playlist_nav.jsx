import React, { useEffect, useRef } from "react";
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
	urlParams,
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
	openPlaylistNavDropdown,
	closePlaylistNavDropdown,
	openPlaylistEditModal,
	closePlaylistEditModal,
}) => {
	useEffect(() => {
		// UseEffect takes 2 args, a callback function and an array of dependencies
		// that will trigger a re-render.
		// setTimeout takes 2 args, an anonymous function and # of milliseconds.
		// It turns the updating callback function into an async function which will
		// wait until all the synchronous code has run before executing.
		// It will allow the Component to load before running updater function again.
		// Otherwise the eventListener will come on and then come off immediately.
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
		console.log("CURRENT", currentQueueSource);
		console.log("OBJ", objToQueue);
		if (
			!!currentQueueSource &&
			objToQueue.sourceType === currentQueueSource.sourceType &&
			objToQueue.extractedUrlParams ===
				currentQueueSource.extractedUrlParams
		) {
			toTogglePlay();
		} else {
			toPlayPlaylist(objToQueue);
			toPushPlay();
		}
	};

	return (
		<>
			<div id="artist-play-button" onClick={handleButtonClick}>
				{isPlaying &&
				objToQueue.sourceType === currentQueueSource.sourceType &&
				objToQueue.extractedUrlParams ===
					currentQueueSource.extractedUrlParams ? (
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
					playlistNavDropdownState={playlistNavDropdownState}
					playlistEditModalState={playlistEditModalState}
					closePlaylistNavDropdown={closePlaylistNavDropdown}
					openPlaylistEditModal={openPlaylistEditModal}
					closePlaylistEditModal={closePlaylistEditModal}
					fetchPlaylists={fetchPlaylists}
					editPlaylist={editPlaylist}
					destroyPlaylist={destroyPlaylist}
					toQueuePlaylist={toQueuePlaylist}
				/>
			) : null}
		</>
	);
};

export default PlaylistNav;
