import React, { useState, useEffect, forwardRef } from "react";

import SongCardSubmenu from "./song_card_submenu";
import SongCardDropdownItem from "./song_card_dropdown_item";

// import { adjustDropdownPosition } from "../../modules/dropdown_functions";

const SongCardDropdown = forwardRef(
	(
		{
			currentItem,
			playlists,
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

		// const handleResize = (ref) => (e) => {
		// 	e.preventDefault;
		// 	adjustDropdownPosition(ref.current, dropdownPosition);
		// }

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

		// TODO: Ensure dropdowns are within viewport
		// useEffect(() => {
		// 	// Attach the resize event listener
		// 	window.addEventListener("resize", handleResize(ref));

		// 	// Cleanup: remove the event listener on component unmount
		// 	return () => {
		// 		window.removeEventListener("resize", handleResize(ref));
		// 	};
		// }, []);

		const toggleSubmenuAndPlaceDropdown = (ref) => (e) => {
			e.preventDefault();
			// adjustDropdownPosition(ref.current, dropdownPosition);
			setSubmenuState({ isOpen: !submenuState.isOpen });
		};

		let depthStyling;
		if (depthLevel > 0) { // Additional styling for playlist submenu
			depthStyling = {
				maxHeight: "250px",
				overflowY: "scroll",
				width: "250px",
				paddingBottom: "50px",
				// top: `${dropdownPosition.top-100}px`,
				// top: `${newTop}px`,
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
				{items.map((item, index) => {
					item.key = crypto.randomUUID();
					return item.submenu ? (
						// If a submenu exists, create button for submenu title and pass submenu to SongCardSubmenu
						<React.Fragment
							key={`${selectedSong.playlistedId}+${depthLevel}+${item.title}+"w-submenu"`}
						>
							<button
								className="song-card-dropdown-item"
								onClick={toggleSubmenuAndPlaceDropdown(ref)}
							>
								{item.title}{" "}
								<span key={`${selectedSong.playlistedId}`}>
									&raquo;
								</span>
							</button>
							<SongCardSubmenu
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
					);
				})}
			</div>
		);
	}
);

export default SongCardDropdown;
