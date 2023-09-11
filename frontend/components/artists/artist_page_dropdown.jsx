import React, { useEffect, useRef } from "react";

import ArtistPageDropdownItem from "./artist_page_dropdown_item";
import SongCardSubmenu from "../songs/song_card_submenu";

const ArtistPageDropdown = ({
	currentArtist,
	history,
	fetchPlaylists,
	editPlaylist,
	artistPageDropdownState,
	artistShowRef,
	artistPageDropdownItems,
	toggleArtistPageDropdown,
}) => {
	const dropdownRef = useRef();

	useEffect(() => {
		const whenMenuIsOpen = (event) => {
			if (
				artistPageDropdownState.isOpen &&
				dropdownRef?.current &&
				!dropdownRef?.current?.contains(event.target)
			) {
				toggleArtistPageDropdown();
			}
		};
		document.addEventListener("mousedown", whenMenuIsOpen);
		document.addEventListener("touchstart", whenMenuIsOpen);
		return () => {
			// Cleanup the event listener when component unmounts
			document.removeEventListener("mousedown", whenMenuIsOpen);
			document.removeEventListener("touchstart", whenMenuIsOpen);
		};
	}, [artistPageDropdownState]);

	if (artistShowRef && artistShowRef.current) {
		if (artistPageDropdownState.isOpen) {
			// Prevent ArtistShow from scrolling when dropdown is open
			artistShowRef.current.style.overflowY = "hidden";
		} else {
			artistShowRef.current.style.overflowY = "auto";
		}
	}

	const keepDropdownOpen = (event) => {
		event.stopPropagation();
		// prevents re-rendering of parent and keeps menu open

		switch (
			event.target.innerText // TODO: Fill out dropdown actions
		) {
			default:
				null;
		}
	};

	return (
		<>
			<div className="dropdown-item artist-dropdown">
				{artistPageDropdownItems.map((item, index) =>
					item.submenu ? (
						<>
							<button>
								{item.title}{" "}
								<span key={`${item.title}+${(currentArtist.id*index)}`}>
									&raquo;
								</span>
							</button>
							<SongCardSubmenu submenus={item.submenu} />
						</>
					) : (
						<ArtistPageDropdownItem item={item} />
					)
				)}
			</div>
		</>
	);
};

export default ArtistPageDropdown;
