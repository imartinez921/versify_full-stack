import React, { useState, useEffect, forwardRef } from "react";

import SongCardDropdownItem from "../songs/song_card_dropdown_item";
import AlbumNavSubmenu from "./album_nav_submenu";

const AlbumNavDropdown = forwardRef(
	(
		{
			history,
			songs,
			playlists,
			currentItem,
			currentUser,
			albumNavDropdownState,
			updateAlbumNavDropdownState,
			items,
			depthLevel,
			removePlaylisted,
			createNewPlaylisted,
			createPlaylist,
			displayPlaylist,
			toQueueView,
			toPlayAlbum,
            fetchPlaylists,
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
			const whenMenuIsOpen = (event) => {
				if (
					albumNavDropdownState.isOpen &&
					ref?.current &&
					!ref?.current?.contains(event.target)
				) {
					updateAlbumNavDropdownState({ isOpen: false });
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
		};
		return (
			<div
				className={`album-nav-dropdown dropdown-submenu ${
					albumNavDropdownState.isOpen ? "show" : ""
				}`}
				data-dropdown
				ref={ref}
			>
				{items.map((item, index) =>
					item.submenu ? (
						// If a submenu exists, create button for submenu title and pass submenu to AlbumNavSubmenu
						<React.Fragment
							key={`
                            "albumnav"+${depthLevel}+${item.id}+"w-submenu"`}
						>
							<button
								className="song-card-dropdown-item"
								onClick={toggleSubmenuAndPlaceDropdown}
							>
								{item.title}{" "}
								<span key={`item.id+"w-submenu`}>
									&raquo;
								</span>
							</button>
							<AlbumNavSubmenu
								history={history}
								songs={songs}
								playlists={playlists}
								currentItem={currentItem}
								currentUser={currentUser}
								submenu={item.submenu}
								submenuState={albumNavSubmenuState}
								depthLevel={depthLevel+=1}
								// dropdownPosition={dropdownPosition}
								updateAlbumNavDropdownState={
									updateAlbumNavDropdownState
								}
								updateAlbumNavSubmenuState={
									updateAlbumNavSubmenuState
								}
								removePlaylisted={removePlaylisted}
								createNewPlaylisted={createNewPlaylisted}
								createPlaylist={createPlaylist}
								displayPlaylist={displayPlaylist}
                                fetchPlaylists={fetchPlaylists}
								toQueueView={toQueueView}
							/>
						</React.Fragment>
					) : (
						<SongCardDropdownItem // Else, create just a button
							key={`"albumnav-subm-button" + ${item.id}}`}
							history={history}
							currentItem={currentItem}
							currentUser={currentUser}
							playlists={playlists}
							selectedIndex={index - 1} // Since the first item is "Create new playlist"
							selectedSong={songs}
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
                            fetchPlaylists={fetchPlaylists}
							toQueueView={toQueueView}
						/>
					)
				)}
			</div>
		);
	}
);

export default AlbumNavDropdown;
