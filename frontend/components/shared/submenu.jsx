import React from "react";
import { useEffect, useRef } from "react";
import SongCardDropdownItem from "../songs/song_card_dropdown_item";

const Submenu = ({
	history,
	songs,
	playlists,
	currentItem,
	currentUser,
	submenu,
	submenuState,
	depthLevel,
	updateDropdownState,
	updateSubmenuState,
	removePlaylisted,
	createNewPlaylisted,
	createPlaylist,
	displayPlaylist,
	fetchPlaylists,
	toQueueView,
	toPlayView,
}) => {
	const dropdownClass = depthLevel > 0 ? "dropdown-submenu" : "";

	const ref = useRef();

	useEffect(() => {
		const whenMenuIsOpen = (event) => {
			if (
				submenuState.isOpen &&
				ref?.current &&
				!ref?.current?.contains(event.target)
			) {
				updateDropdownState({ isOpen: false });
				updateSubmenuState({ isOpen: false });
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
			className={`song-card-dropdown album-dropdown album-submenu dropdown-submenu ${dropdownClass} ${
				submenuState.isOpen ? "show" : ""
			}`}
			ref={ref}
			data-dropdown
		>
			{submenu.map((item, index) => {
				return (
					<SongCardDropdownItem // Else, create just a button
						key={`"albummenu-submenu"+${depthLevel}+${item.id}`}
						history={history}
						currentItem={currentItem}
						currentUser={currentUser}
						playlists={playlists}
						selectedIndex={index - 1} // Since the first item is "Create new playlist"
						selectedSong={songs}
						updateSongCardDropdownState={updateDropdownState}
						item={item}
						depthLevel={depthLevel}
						// dropdownPosition={dropdownPosition}
						removePlaylisted={removePlaylisted}
						createNewPlaylisted={createNewPlaylisted}
						createPlaylist={createPlaylist}
						displayPlaylist={displayPlaylist}
						fetchPlaylists={fetchPlaylists}
						toQueueView={toQueueView}
						toPlayView={toPlayView}
					/>
				);
			})}
		</div>
	);
};

export default Submenu;
