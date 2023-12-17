import React from "react";
import { useState, useEffect, useRef } from "react";

import AlbumNavDropdownContainer from "./album_nav_dropdown_container";

import { RxDotsHorizontal } from "react-icons/rx";
import { GrPlayFill } from "react-icons/gr";

const AlbumNav = ({ tracks, playlists, history }) => {
	// const toggleAlbumNavDropdown = (event) => {
	//     event.preventDefault();
	//     playlistNavDropdownState.isOpen ? closePlaylistNavDropdown() : openPlaylistNavDropdown();
	// }

	// Set local states for AlbumNavDropdownState
	const [albumNavDropdownState, setAlbumNavDropdownState] = useState({
		isOpen: false,
	});

	// Updater functions for local states
	const updateAlbumNavDropdownState = (newState) => {
		setAlbumNavDropdownState(newState);
	};

	const toggleAlbumNavDropdown = (e) => {
		e.preventDefault();
		setAlbumNavDropdownState({isOpen: !albumNavDropdownState.isOpen});
	};

	const albumNavDropdownItems = [
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

	const albumNavRef = useRef();

	return (
		<>
			<div id="playlist-play-button">
				<GrPlayFill />
			</div>
			<div id="playlist-dropdown-dots" onClick={toggleAlbumNavDropdown}>
				<RxDotsHorizontal />
			</div>
			<AlbumNavDropdownContainer
				ref={albumNavRef}
				albumNavDropdownState={albumNavDropdownState}
				items={albumNavDropdownItems}
				updateAlbumNavDropdownState={updateAlbumNavDropdownState}
			/>
		</>
	);
};

export default AlbumNav;
