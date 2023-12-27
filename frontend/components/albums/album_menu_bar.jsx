import React from "react";
import { useState, useEffect, useRef } from "react";

import AlbumDropdownContainer from "./album_dropdown_container";

import { RxDotsHorizontal } from "react-icons/rx";
import { GrPlayFill } from "react-icons/gr";

const AlbumMenuBar = ({ tracks, playlists, history }) => {
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

	const objToQueue = {
		viewSongs: tracks,
		sourcedFrom: history.location.pathname,
	}; // provides linkback to view currently playing

	const albumRef = useRef();

	return (
		<>
			<div id="playlist-play-button">
				<GrPlayFill />
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
