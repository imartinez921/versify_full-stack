import React, { useState, useEffect, forwardRef } from "react";

import SongCardDropdownItem from "../songs/song_card_dropdown_item";
import Submenu from "../shared/submenu";

const ArtistDropdown = forwardRef(
	(
		{
			history,
			songs,
			playlists,
			currentItem,
			currentUser,
			artistDropdownState,
			updateArtistDropdownState,
			items,
			depthLevel,
			removePlaylisted,
			createNewPlaylisted,
			createPlaylist,
			displayPlaylist,
			fetchPlaylists,
			toQueueView,
			toPlayView,
		},
		ref
	) => {
		// Set local state for artist Submenu
		const [artistSubmenuState, setArtistSubmenuState] = useState({
			isOpen: false,
		});
		const updateArtistSubmenuState = (newState) => {
			setArtistSubmenuState(newState);
		};

		// Add event listeners when menu is open; remove when menu is closed
		useEffect(() => {
			const whenMenuIsOpen = (event) => {
				if (
					artistDropdownState.isOpen &&
					ref?.current &&
					!ref?.current?.contains(event.target)
				) {
					updateArtistDropdownState({ isOpen: false });
				}
			};
			document.addEventListener("mousedown", whenMenuIsOpen);
			document.addEventListener("touchstart", whenMenuIsOpen);
			return () => {
				// Cleanup the event listener when component unmounts
				document.removeEventListener("mousedown", whenMenuIsOpen);
				document.removeEventListener("touchstart", whenMenuIsOpen);
			};
		}, [artistDropdownState]);

		const toggleSubmenuAndPlaceDropdown = (e) => {
			e.preventDefault();
			setArtistSubmenuState({ isOpen: !artistSubmenuState.isOpen });
		};

		return (
			<div
				className={`${
					history.location.pathname.split("/")[1]
				}-dropdown dropdown-submenu ${
					artistDropdownState.isOpen ? "show" : ""
				}`}
				data-dropdown
				ref={ref}
			>
				{items.map((item, index) =>
					item.submenu ? (
						// If a submenu exists, create button for submenu title and pass submenu to Submenu
						<React.Fragment
							key={`"artistdropdown"+${item.id}+"w-submenu"`}
						>
							<button
								className="song-card-dropdown-item"
								onClick={toggleSubmenuAndPlaceDropdown}
							>
								{item.title}{" "}
								<span key={`"item.id"+"w-submenu"`}>
									&raquo;
								</span>
							</button>
							<Submenu
								history={history}
								songs={songs}
								playlists={playlists}
								currentItem={currentItem}
								currentUser={currentUser}
								submenu={item.submenu}
								submenuState={artistSubmenuState}
								depthLevel={(depthLevel += 1)}
								// dropdownPosition={dropdownPosition}
								updateDropdownState={
									updateArtistDropdownState
								}
								updateSubmenuState={
									updateArtistSubmenuState
								}
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
							key={`artistdropdown-subm-button" + ${item.id}`}
							history={history}
							currentItem={currentItem}
							currentUser={currentUser}
							playlists={playlists}
							selectedIndex={index - 1} // Since the first item is "Create new playlist"
							selectedSong={songs}
							updateSongCardDropdownState={
								updateArtistDropdownState
							}
							item={item}
							depthLevel={depthLevel}
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

export default ArtistDropdown;
