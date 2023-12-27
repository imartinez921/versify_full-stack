import React from "react";
import { useState, useEffect, useRef } from "react";

import AlbumDropdownContainer from "./album_dropdown_container";

import { RxDotsHorizontal } from "react-icons/rx";
import {
	MdOutlinePlayCircleFilled,
	MdOutlinePauseCircleFilled,
} from "react-icons/md";

const AlbumMenuBar = ({
	currentUser,
	isPlaying,
	currentQueueSource,
	tracks,
	playlists,
	history,
	toPlayAlbum,
	toPushPlay,
	toTogglePlay,
}) => {
	console.log(toPushPlay)
	// Set local states for AlbumDropdownState
	const [albumDropdownState, setAlbumDropdownState] = useState({
		isOpen: false,
	});

	// Updater functions for local states
	const updateAlbumDropdownState = (newState) => {
		setAlbumDropdownState(newState);
	};

	const toggleAlbumDropdown = (e) => {
		e.preventDefault();
		setAlbumDropdownState({ isOpen: !albumDropdownState.isOpen });
	};

	const objToQueue = {
		albumSongs: tracks,
		sourcedFrom: history.location.pathname,
	}; // provides linkback to view currently playing

	const handleButtonClick = (e) => {
		e.preventDefault();
		if (
			!!currentQueueSource &&
			objToQueue.sourcedFrom === currentQueueSource.sourcedFrom
		) {
			toTogglePlay();
		} else {
			toPlayAlbum(objToQueue);
			toPushPlay();
		}
	};

	const albumDropdownItems = [
		{ title: "Play album", id: `${crypto.randomUUID()}` },
		{
			title: "Add to queue",
		},
		{
			title: "Add to playlist",
			submenu: [
				{
					title: "Create new playlist",
				},
				...playlists,
				// Enclose array of playlists in an array since
				// dropdown uses recursive .map function on items prop
			],
		},
	];

	const albumRef = useRef();

	return (
		<>
			<div id="artist-play-button" onClick={handleButtonClick}>
				{isPlaying &&
				objToQueue.sourcedFrom === currentQueueSource.sourcedFrom ? (
					<MdOutlinePauseCircleFilled />
				) : (
					<MdOutlinePlayCircleFilled />
				)}
			</div>
			<div id="playlist-dropdown-dots" onClick={toggleAlbumDropdown}>
				<RxDotsHorizontal />
			</div>
			<AlbumDropdownContainer
				ref={albumRef}
				history={history}
				albumDropdownState={albumDropdownState}
				items={albumDropdownItems}
				updateAlbumDropdownState={updateAlbumDropdownState}
			/>
		</>
	);
};

export default AlbumMenuBar;
