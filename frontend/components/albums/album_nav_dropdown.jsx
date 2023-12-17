import React, { useState, useEffect, forwardRef } from "react";

import SongCardDropdownItem from "../songs/song_card_dropdown_item";
import AlbumNavSubmenu from "./album_nav_submenu";


const AlbumNavDropdown = forwardRef(
	(
		{
			songs,
			playlists,
            selectedSong,
            currentItem,
			currentUser,
			albumNavDropdownState,
			updateAlbumNavDropdownState,
			items,
			depthLevel,
            submenuState,
			removePlaylisted,
			createNewPlaylisted,
			createPlaylist,
			displayPlaylist,
            toQueueView,
            toPlayAlbum,
		},
		ref
	) => {

        // Set local state for albumNavSubmenu
		const [albumNavSubmenuState, setAlbumNavSubmenuState] = useState({
			isOpen: false,
		});
        const updateAlbumNavSubmenuState = (newState) => {
            setAlbumNavSubmenuState(newState);
        };

		// Add event listeners when menu is open; remove when menu is closed
		useEffect(() => {
            console.log("albumNavDropdownState", albumNavDropdownState);
			const whenMenuIsOpen = (event) => {
				if (
					albumNavDropdownState.isOpen &&
					ref?.current &&
					!ref?.current?.contains(event.target)
				) {
					updateAlbumNavDropdownState({ isOpen: false });
                    console.log(albumNavDropdownState)

				}
			};
			document.addEventListener("mousedown", whenMenuIsOpen);
			document.addEventListener("touchstart", whenMenuIsOpen);
			return () => {
				// Cleanup the event listener when component unmounts
				document.removeEventListener("mousedown", whenMenuIsOpen);
				document.removeEventListener("touchstart", whenMenuIsOpen);
			};
		}, [albumNavDropdownState]);

        const toggleSubmenuAndPlaceDropdown = (e) => {
            e.preventDefault();
            setAlbumNavSubmenuState({ isOpen: !albumNavSubmenuState.isOpen });
            console.log("albumNavSubmenuState", albumNavSubmenuState)
        };

		return (
			<div
				className={`album-nav-dropdown dropdown-submenu ${
					albumNavDropdownState.isOpen ? "show" : ""
				}`}
				data-dropdown
				ref={ref}
				// style={{
				// 	left: `${dropdownPosition.left}px`,
				// 	top: `${dropdownPosition.top}px`,
				// 	...depthStyling,
				// }}
			>
				{items.map((item, index) =>
					item.submenu ? (
						// If a submenu exists, create button for submenu title and pass submenu to AlbumNavSubmenu
						<React.Fragment
							key={`${selectedSong.playlistedId}+${depthLevel}+${item.title}+"w-submenu"`}
						>
							<button
								className="song-card-dropdown-item"
								onClick={toggleSubmenuAndPlaceDropdown}
							>
								{item.title}{" "}
								<span key={`${selectedSong.playlistedId}`}>
									&raquo;
								</span>
							</button>
							<AlbumNavSubmenu
								songs={songs}
								playlists={playlists}
								selectedSong={selectedSong}
								currentItem={currentItem}
								currentUser={currentUser}
								submenu={item.submenu}
								submenuState={albumNavSubmenuState}
								depthLevel={depthLevel}
								// dropdownPosition={dropdownPosition}
								updateAlbumNavDropdownState={
									updateAlbumNavDropdownState
								}
                                updateAlbumNavSubmenuState={updateAlbumNavSubmenuState}
								removePlaylisted={removePlaylisted}
								createNewPlaylisted={createNewPlaylisted}
								createPlaylist={createPlaylist}
								displayPlaylist={displayPlaylist}
								toQueueView={toQueueView}
							/>
						</React.Fragment>
					) : (
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
					)
				)}
			</div>
		);
	}
);

export default AlbumNavDropdown;