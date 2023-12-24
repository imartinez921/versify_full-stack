import React from "react";

const SongCardDropdownItem = ({
	history,
	currentItem,
	playlists,
	currentUser,
	selectedIndex,
	selectedSong,
	updateSongCardDropdownState,
	item,
	depthLevel,
	removePlaylisted,
	createNewPlaylisted,
	createPlaylist,
	displayPlaylist,
    fetchPlaylists,
	toQueueView,
}) => {
	let objToQueue;
	let selectedPlaylist = playlists[selectedIndex];
	if (selectedSong.constructor !== Array) selectedSong = [selectedSong];

	// Define all song actions
	const addToQueue = (selectedSongArr) => {
		objToQueue = {
			viewSongs: selectedSongArr,
			sourcedFrom: history.location.pathname,
		};
		return toQueueView(objToQueue);
	};
	const addToPlaylist = async (selectedSongArr) => {
		const promises = selectedSongArr.map((song) => {
			return createNewPlaylisted(song.id, selectedPlaylist.id);
		});
		// If we are currently viewing that playlist, then re-fetch the playlist
		await Promise.all(promises);
		if (currentItem.id === selectedPlaylist.id) {
			displayPlaylist(selectedPlaylist.id);
		}
		fetchPlaylists();
	};

	const makeIntoPlaylist = async (selectedSongArr) => {
		let title =
			selectedSongArr.length === 1
				? selectedSongArr[0].title
				: currentItem.title;
		const newPlaylist = {
			title: title,
			description: "Please add a description",
			user_id: currentUser.id, // Database/schema uses snake_case
		};
		let promises;
		createPlaylist(newPlaylist).then((playlistId) => {
			promises = selectedSongArr.map((song) => {
				return createNewPlaylisted(song.id, playlistId);
			});
		});
		await Promise.all(promises);
		fetchPlaylists();
	};

	const runSongAction = (e) => {
		if (e.target.innerText === "Add to queue") {
			updateSongCardDropdownState({ isOpen: false });
			return addToQueue(selectedSong);
		} else if (e.target.innerText === "Remove from this playlist") {
			updateSongCardDropdownState({ isOpen: false });
			return removePlaylisted(selectedSong[0].playlistedId);
		} else if (e.target.innerText === "Create new playlist") {
			updateSongCardDropdownState({ isOpen: false });
			makeIntoPlaylist(selectedSong);
			return setTimeout(() => {
				fetchPlaylists();
			}, 0);
		} else if (depthLevel === 1) {
			updateSongCardDropdownState({ isOpen: false });
			addToPlaylist(selectedSong);
		}
	};

	return (
		<button
			className="song-card-dropdown-item"
			key={`${selectedIndex}+${item.title}+"no-subm"`}
			type="button"
			onClick={runSongAction}
		>
			{item.title}{" "}
		</button>
	);
};

export default SongCardDropdownItem;
