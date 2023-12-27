import React, { useState, useEffect, forwardRef } from "react";

import SongCardSubmenu from "./song_card_submenu";
import SongCardDropdownItem from "./song_card_dropdown_item";

const SongCardDropdown = forwardRef(
	(
		{
			currentItem,
			playlists,
			history,
			currentUser,
			selectedSong,
			songCardDropdownState,
			updateSongCardDropdownState,
			items,
			depthLevel,
			dropdownPosition,
			removePlaylisted,
			createNewPlaylisted,
			fetchPlaylists,
			createPlaylist,
			displayPlaylist,
			toQueueView,
		},
		ref
	) => {
		// Set local state for SongCardSubmenu

		const [submenuState, setSubmenuState] = useState({ isOpen: false });

		// Add event listeners when menu is open; remove when menu is closed
		useEffect(() => {
			const whenMenuIsOpen = (event) => {
				if (
					songCardDropdownState.isOpen &&
					ref?.current &&
					!ref?.current?.contains(event.target)
				) {
					updateSongCardDropdownState({ isOpen: false });
					setSubmenuState({ isOpen: false });
				}
			};
			document.addEventListener("mousedown", whenMenuIsOpen);
			document.addEventListener("touchstart", whenMenuIsOpen);
			return () => {
				// Cleanup the event listener when component unmounts
				document.removeEventListener("mousedown", whenMenuIsOpen);
				document.removeEventListener("touchstart", whenMenuIsOpen);
			};
		}, [songCardDropdownState]);

		const toggleSubmenuAndPlaceDropdown = (e) => {
			e.preventDefault();
			setSubmenuState({ isOpen: !submenuState.isOpen });
		};

		let depthStyling;
		if (depthLevel > 0) {
			depthStyling = {
				maxHeight: "250px",
				overflowY: "scroll",
				width: "250px",
			};
		}

		return (
			<div
				className="song-card-dropdown dropdown-item"
				data-dropdown
				ref={ref}
				style={{
					left: `${dropdownPosition.left}px`,
					top: `${dropdownPosition.top}px`,
					...depthStyling,
				}}
			>
				{items.map((item, index) =>{
					item.key = crypto.randomUUID();
					return item.submenu ? (
						// If a submenu exists, create button for submenu title and pass submenu to SongCardSubmenu
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
							<SongCardSubmenu
								history={history}
								currentUser={currentUser}
								selectedSong={selectedSong}
								songCardDropdownState={songCardDropdownState}
								submenus={item.submenu}
								submenuState={submenuState}
								depthLevel={depthLevel}
								dropdownPosition={dropdownPosition}
								updateSongCardDropdownState={
									updateSongCardDropdownState
								}
							/>
						</React.Fragment>
					) : (
						<SongCardDropdownItem // Else, create just a button
							key={`${item.key}+"no-subm"`}
							history={history}
							currentItem={currentItem}
							playlists={playlists}
							currentUser={currentUser}
							selectedIndex={index - 1} // Since the first item is "Create new playlist"
							selectedSong={selectedSong}
							updateSongCardDropdownState={
								updateSongCardDropdownState
							}
							item={item}
							depthLevel={depthLevel}
							dropdownPosition={dropdownPosition}
							removePlaylisted={removePlaylisted}
							createNewPlaylisted={createNewPlaylisted}
							fetchPlaylists={fetchPlaylists}
							createPlaylist={createPlaylist}
							displayPlaylist={displayPlaylist}
							toQueueView={toQueueView}
						/>
					);}
				)}
			</div>
		);
	}
);

export default SongCardDropdown;
