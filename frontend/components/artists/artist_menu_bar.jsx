import React, { useRef, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import ArtistDropdownContainer from "./artist_dropdown_container";

import { RxDotsHorizontal } from "react-icons/rx";
import {
	MdOutlinePlayCircleFilled,
	MdOutlinePauseCircleFilled,
} from "react-icons/md";

// Dropdown functionality using local states and useRefs
const ArtistMenuBar = ({
	artistShowRef,
	allSongs,
	history,
	isPlaying,
	currentQueueSource,
	toTogglePlay,
	toPlayArtist,
	toPushPlay,
}) => {
	const [artistDropdownState, setArtistDropdownState] = useState({
		isOpen: false,
	});

	// Updater functions for local states
	const updateArtistDropdownState = (newState) => {
		setArtistDropdownState(newState);
	};
	const toggleArtistDropdown = () => {
		setArtistDropdownState({ isOpen: !artistDropdownState.isOpen });
	};

	// Prevent ArtistShow from scrolling when dropdown is open
	if (artistShowRef && artistShowRef.current) {
		if (artistDropdownState.isOpen) {
			artistShowRef.current.style.overflowY = "hidden";
		} else {
			artistShowRef.current.style.overflowY = "auto";
		}
	}

	const objToQueue = {
		allSongs,
		sourcedFrom: history.location.pathname,
	}; // provides linkback to view currently playing
	// TODO: Implement queue view

	const handleButtonClick = (e) => {
		e.preventDefault();
		if (
			!!currentQueueSource &&
			objToQueue.sourcedFrom === currentQueueSource.sourcedFrom
		) {
			toTogglePlay();
		} else {
			toPlayArtist(objToQueue);
			toPushPlay();
		}
	};

	// Create dropdown ref in parent component in order to wrap Redux container
	const dropdownRef = useRef();
	return (
		<>
			<div id="artist-play-button" onClick={handleButtonClick}>
				{isPlaying &&
				objToQueue.sourcedFrom === currentQueueSource.sourcedFrom ? (
					<MdOutlinePauseCircleFilled />
				) : (
					<MdOutlinePlayCircleFilled />
				)}
			</div>
			<div id="artist-dropdown-dots">
				<RxDotsHorizontal onClick={toggleArtistDropdown} />
			</div>
			{artistDropdownState.isOpen && (
				<ArtistDropdownContainer
					artistDropdownState={artistDropdownState}
					history={history}
					ref={dropdownRef}
					updateArtistDropdownState={updateArtistDropdownState}
				/>
			)}
		</>
	);
};

export default withRouter(ArtistMenuBar);
