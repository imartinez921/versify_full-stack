import React from "react";
import { useEffect, useRef } from "react";
import SongCardDropdownItem from "../songs/song_card_dropdown_item";

const AlbumNavSubmenu = ({
	songs,
	playlists,
	selectedSong,
	currentItem,
	currentUser,
	submenu,
	submenuState,
	depthLevel,
	updateAlbumNavDropdownState,
	removePlaylisted,
	createNewPlaylisted,
	createPlaylist,
	displayPlaylist,
	toQueueView,
}) => {
	depthLevel += 1;
	const dropdownClass = depthLevel > 0 ? "dropdown-submenu" : "";

	const ref = useRef();

	useEffect(() => {
		console.log("submenuState", submenuState);
		const whenMenuIsOpen = (event) => {
			if (
				submenuState.isOpen &&
				ref?.current &&
				!ref?.current?.contains(event.target)
			) {
				updateAlbumNavDropdownState({ isOpen: false });
				console.log(submenuState);
			}
		};
		document.addEventListener("mousedown", whenMenuIsOpen);
		document.addEventListener("touchstart", whenMenuIsOpen);
		return () => {
			// Cleanup the event listener when component unmounts
			document.removeEventListener("mousedown", whenMenuIsOpen);
			document.removeEventListener("touchstart", whenMenuIsOpen);
		};
	}, [submenuState]);

	return (
		<div
			className={`album-nav-dropdown album-nav-submenu dropdown-submenu ${dropdownClass} ${
				submenuState.isOpen ? "show" : ""
			}`}
			ref={ref}
			data-dropdown
		>
			{submenu.map((item, index) => {
				debugger
				return (
					<SongCardDropdownItem // Else, create just a button
						key={`${selectedSong.playlistedId}+${item.id}+${depthLevel}+"no-subm"`}
						currentItem={currentItem}
						playlists={playlists}
						currentUser={currentUser}
						selectedIndex={index - 1} // Since the first item is "Create new playlist"
						selectedSong={selectedSong}
						updateSongCardDropdownState={
							updateAlbumNavDropdownState
						}
						item={item}
						depthLevel={depthLevel}
						// dropdownPosition={dropdownPosition}
						removePlaylisted={removePlaylisted}
						createNewPlaylisted={createNewPlaylisted}
						createPlaylist={createPlaylist}
						displayPlaylist={displayPlaylist}
						toQueueView={toQueueView}
					/>
				);
			})}
		</div>
	);
};

export default AlbumNavSubmenu;
