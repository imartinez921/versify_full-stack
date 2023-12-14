import React, { useState, useEffect, forwardRef } from "react";


const AlbumNavDropdown = forwardRef(
	(
		{
			songs,
			playlists,
			currentUser,
			albumNavDropdownState,
			updateAlbumNavDropdownState,
			items,
			depthLevel,
			removePlaylisted,
			createNewPlaylisted,
			createPlaylist,
			displayPlaylist,
            toQueueAlbum,
            toPlayAlbum,
		},
		ref
	) => {
		console.log(albumNavDropdownState);
        // Set local state for albumNavSubmenu
		const [albumNavSubmenuState, setAlbumNavSubmenuState] = useState({
			isOpen: false,
		});

		// Add event listeners when menu is open; remove when menu is closed
		useEffect(() => {
			const whenMenuIsOpen = (event) => {
				if (
					albumNavDropdownState.isOpen &&
					ref?.current &&
					!ref?.current?.contains(event.target)
				) {
					updateAlbumNavDropdownState({ isOpen: false });
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
		}, [albumNavDropdownState]);


		return <div className="playlist-dropdown">THIS IS NAV DROPDOWN</div>;
	}
);

export default AlbumNavDropdown;