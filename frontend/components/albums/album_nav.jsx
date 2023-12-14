import React from "react";
import { useState, useEffect, useRef } from "react";

import AlbumNavDropdownContainer from "./album_nav_dropdown_container";

import { RxDotsHorizontal } from "react-icons/rx";
import { GrPlayFill } from "react-icons/gr";

const AlbumNav = ({ playlists }) => {
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
    }

	const toggleAlbumNavDropdown = (e) => {
		e.preventDefault();
		if (!albumNavDropdownState.isOpen) {
			updateAlbumNavDropdownState({ isOpen: true });
		}
	};

	const albumNavDropdownItems = [
		{
			title: "Add to queue",
		},
		{
			title: "Add to playlist",
			submenu: [
				[
					{
						title: "Create new playlist",
					},
					...playlists,
					// Enclose array of playlists in an array since
					// dropdown uses recursive .map function on items prop
				],
			],
		},
	];

	return (
		<>
			<div id="playlist-play-button">
				<GrPlayFill />
			</div>
			<div id="playlist-dropdown-dots" onClick={toggleAlbumNavDropdown}>
				<RxDotsHorizontal />
			</div>
			<AlbumNavDropdownContainer
				albumNavDropdownState={albumNavDropdownState}
                items={albumNavDropdownItems}
			/>
		</>
	);
};

export default AlbumNav;
