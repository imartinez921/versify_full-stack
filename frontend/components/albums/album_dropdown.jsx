import React, { useState, useEffect, forwardRef } from "react";

import SongCardDropdownItem from "../songs/song_card_dropdown_item";
import Submenu from "../shared/submenu";

const AlbumDropdown = forwardRef(
	(
		{
			history,
			songs,
			playlists,
			currentItem,
			currentUser,
			albumDropdownState,
			updateAlbumDropdownState,
			items,
			depthLevel,
			removePlaylisted,
			createNewPlaylisted,
			createPlaylist,
			displayPlaylist,
			toQueueView,
			toPlayView,
			fetchPlaylists,
		},
		ref
	) => {
		// Set local state for albumSubmenu
		const [albumSubmenuState, setSubmenuState] = useState({
			isOpen: false,
		});
		const updateSubmenuState = (newState) => {
			setSubmenuState(newState);
		};

		// Add event listeners when menu is open; remove when menu is closed
		useEffect(() => {
			const whenMenuIsOpen = (event) => {
				if (
					albumDropdownState.isOpen &&
					ref?.current &&
					!ref?.current?.contains(event.target)
				) {
					updateAlbumDropdownState({ isOpen: false });
				}
			};
			document.addEventListener("mousedown", whenMenuIsOpen);
			document.addEventListener("touchstart", whenMenuIsOpen);
			return () => {
				// Cleanup the event listener when component unmounts
				document.removeEventListener("mousedown", whenMenuIsOpen);
				document.removeEventListener("touchstart", whenMenuIsOpen);
			};
		}, [albumDropdownState]);

		const toggleSubmenuAndPlaceDropdown = (e) => {
			e.preventDefault();
			setSubmenuState({ isOpen: !albumSubmenuState.isOpen });
		};
		return (
			<div
				className={`${
					history.location.pathname.split("/")[1]
				}-dropdown dropdown-submenu ${
					albumDropdownState.isOpen ? "show" : ""
				}`}
				data-dropdown
				ref={ref}
			>
				{items.map((item, index) =>
					item.submenu ? (
						// If a submenu exists, create button for submenu title and pass submenu to Submenu
						<React.Fragment
							key={`
                            "albummenu"+${depthLevel}+${item.id}+"w-submenu"`}
						>
							<button
								className="song-card-dropdown-item"
								onClick={toggleSubmenuAndPlaceDropdown}
							>
								{item.title}{" "}
								<span key={`item.id+"w-submenu`}>&raquo;</span>
							</button>
							<Submenu
								history={history}
								songs={songs}
								playlists={playlists}
								currentItem={currentItem}
								currentUser={currentUser}
								submenu={item.submenu}
								submenuState={albumSubmenuState}
								depthLevel={(depthLevel += 1)}
								// dropdownPosition={dropdownPosition}
								updateDropdownState={
									updateAlbumDropdownState
								}
								updateSubmenuState={updateSubmenuState}
								removePlaylisted={removePlaylisted}
								createNewPlaylisted={createNewPlaylisted}
								createPlaylist={createPlaylist}
								displayPlaylist={displayPlaylist}
								fetchPlaylists={fetchPlaylists}
								toQueueView={toQueueView}
								toPlayView={toPlayView}
							/>
						</React.Fragment>
					) : (
						<SongCardDropdownItem // Else, create just a button
							key={`"albummenu-subm-button" + ${item.id}}`}
							history={history}
							currentItem={currentItem}
							currentUser={currentUser}
							playlists={playlists}
							selectedIndex={index - 1} // Since the first item is "Create new playlist"
							selectedSong={songs}
							updateSongCardDropdownState={
								updateAlbumDropdownState
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
							toPlayView={toPlayView}
						/>
					)
				)}
			</div>
		);
	}
);

export default AlbumDropdown;
