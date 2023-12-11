import React, { useRef, useState, useEffect } from "react";
import ArtistPageDropdownContainer from "./artist_page_dropdown_container";

import { RxDotsHorizontal } from "react-icons/rx";
import {
	MdOutlinePlayCircleFilled,
	MdOutlinePauseCircleFilled,
} from "react-icons/md";

// Dropdown functionality using local states and useRefs
const ArtistPageMenuBar = ({
	artistShowRef,
	allSongs,
	isPlaying,
	currentQueueSource,
	toTogglePlay,
	toQueueArtist,
	toPlayArtist,
	toPushPlay,
	history,
	urlParams,
}) => {
	const [artistPageDropdownState, setArtistPageDropdownState] = useState({
		isOpen: false,
	});
	const toggleArtistPageDropdown = () => {
		setArtistPageDropdownState({ isOpen: !artistPageDropdownState.isOpen });
	};

	// Prevent ArtistShow from scrolling when dropdown is open
	if (artistShowRef && artistShowRef.current) {
		if (artistPageDropdownState.isOpen) {
			artistShowRef.current.style.overflowY = "hidden";
		} else {
			artistShowRef.current.style.overflowY = "auto";
		}
	}

	const objToQueue = {
		allSongs,
		sourceType: "artist",
		extractedUrlParams: urlParams.id,
	}; // provides linkback to view currently playing
	// TODO: Implement queue view

	const handleButtonClick = (e) => {
		e.preventDefault();
		if (
			!!currentQueueSource &&
			objToQueue.sourceType === currentQueueSource.sourceType &&
			objToQueue.extractedUrlParams === currentQueueSource.extractedUrlParams
		) {
			toTogglePlay();
		} else {
			toPlayArtist(objToQueue);
			toPushPlay();
		}
	};

	const handleAddToQueue = (e) => {
		e.preventDefault();
		toQueueArtist(objToQueue);
		setArtistPageDropdownState({ isOpen: false });
	};

	// Create dropdown ref in parent component in order to wrap Redux container
	const dropdownRef = useRef();
	return (
		<>
			<div id="artist-play-button" onClick={handleButtonClick}>
				{isPlaying &&
				objToQueue.sourceType === currentQueueSource.sourceType &&
				objToQueue.extractedUrlParams ===
					currentQueueSource.extractedUrlParams ? (
					<MdOutlinePauseCircleFilled />
				) : (
					<MdOutlinePlayCircleFilled />
				)}
			</div>
			<div id="artist-dropdown-dots">
				<RxDotsHorizontal onClick={toggleArtistPageDropdown} />
			</div>
			{artistPageDropdownState.isOpen && (
				<ArtistPageDropdownContainer
					handleAddToQueue={handleAddToQueue}
					history={history}
					artistPageDropdownState={artistPageDropdownState}
					ref={dropdownRef}
					toggleArtistPageDropdown={toggleArtistPageDropdown}
				/>
			)}
		</>
	);
};

export default ArtistPageMenuBar;
