import React, { useEffect } from "react";
import PlaylistEditModal from "./playlist_edit_modal";

const PlaylistNavDropdown = ({
    objToQueue,
    history,
    currentPlaylist,
	playlistSongs,
    playlistNavDropdownState,
    playlistEditModalState,
    closePlaylistNavDropdown,
    openPlaylistEditModal,
    closePlaylistEditModal,
    fetchPlaylists,
    editPlaylist,
    destroyPlaylist,
    toQueuePlaylist,
	toPlayPlaylist,
}) => {
	useEffect(() => {
		// UseEffect takes 2 args, a callback function and an array of dependencies
		// that will trigger a re-render.
		// setTimeout takes 2 args, an anonymous function and # of milliseconds.
		// It turns the updating callback function into an async function which will
		// wait until all the synchronous code has run before executing.
		// It will allow the Component to load before running updater function again.
		// Otherwise the eventListener will come on and then come off immediately.
		setTimeout(() => {
			if (
				playlistNavDropdownState.isOpen &&
				!playlistEditModalState.isOpen
			) {
				window.addEventListener("click", closePlaylistNavDropdown);
			}
		}, 0);
		// if (playlistNavDropdownState.isOpen) window.addEventListener('click', closePlaylistNavDropdown);

		return () => {
			closePlaylistNavDropdown();
			window.removeEventListener("click", closePlaylistNavDropdown);
		};
	}, []);

	const addToQueue = (objToQueue) => {
		if (playlistSongs?.length > 0) {
			return toQueuePlaylist(objToQueue);
		}
	};

	const playNow = (objToQueue) => {
		if (playlistSongs?.length > 0) {
			return toPlayPlaylist(objToQueue);
		}
	};

	const keepDropdownOpen = (event) => {
		event.stopPropagation();
		// prevents re-rendering of parent and keeps menu open
		switch (event.target.innerText) {
			case "Play playlist":
				playNow(objToQueue);
				return closePlaylistNavDropdown();
			case "Edit details":
				openPlaylistEditModal();
				return console.log("OPEN EDIT MODAL");
			case "Delete":
				destroyPlaylist(currentPlaylist.id);
				return history.push("/home");
			case "Add to queue":
				addToQueue(objToQueue);
                return closePlaylistNavDropdown();
			default:
				null;
		}
	};

	return (
		<>
			<div
				className="dropdown-item playlist-dropdown"
				onClick={keepDropdownOpen}
			>
				<button className="playlist-dropdown-button">
					Play playlist
				</button>
				<button className="playlist-dropdown-button">
					Edit details
				</button>
				<button className="playlist-dropdown-button">Delete </button>
				<button className="playlist-dropdown-button">
					Add to queue
				</button>
			</div>
			{playlistEditModalState.isOpen && (
				<PlaylistEditModal
					playlistEditModalState={playlistEditModalState}
					closePlaylistNavDropdown={closePlaylistNavDropdown}
					closePlaylistEditModal={closePlaylistEditModal}
					currentPlaylist={currentPlaylist}
					editPlaylist={editPlaylist}
				/>
			)}
		</>
	);
}

export default PlaylistNavDropdown;