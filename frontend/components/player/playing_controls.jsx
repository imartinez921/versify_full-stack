import React from "react";
import {
	MdOutlinePlayCircleFilled,
	MdOutlinePauseCircleFilled,
} from "react-icons/md";
import { BiSkipPrevious, BiSkipNext, BiShuffle } from "react-icons/bi";
import { BsRepeat, BsRepeat1, BsPauseCircle } from "react-icons/bs";
import { useEffect } from "react";

const PlayingControls = ({
	hasQueue,
	objToQueue,
	isPlaying,
	toPlayView,
	togglePlay,
	toPushPlay,
	toPrevTrack,
	toNextTrack,
	toggleShuffle,
}) => {

	const handleClick = (e) => {
		e.preventDefault();
		if (objToQueue.sourcedFrom.split("/")[1] === "artist") {
			// Accounts for unique currentItem slice of state when ArtistShow view
			objToQueue.viewSongs = objToQueue.viewSongs.allSongs;
		}
		if (!hasQueue) {
			if (objToQueue?.viewSongs?.length > 0) {
				toPlayView(objToQueue);
				toPushPlay();
			}
		} else {
			togglePlay();
		}
	};

	return (
		<div className="playing-controls">
			{/* <BiShuffle/ */}
			<div
				className="player__grey-icon repeat-shuffle-icon"
				aria-label="Shuffle"
				onClick={toggleShuffle}
			/>
			<BiSkipPrevious
				className="player__grey-icon"
				aria-label="Previous"
				onClick={toPrevTrack}
			/>
			{isPlaying ? (
				<MdOutlinePauseCircleFilled
					className="player__white-icon"
					aria-label="Pause"
					onClick={togglePlay}
				/>
			) : (
				<MdOutlinePlayCircleFilled
					className="player__white-icon"
					aria-label="Play"
					onClick={handleClick}
				/>
			)}
			<BiSkipNext
				className="player__grey-icon"
				aria-label="Next"
				onClick={toNextTrack}
			/>
			{/* <BsRepeat // TODO: implement repeat functionality */}
			<div
				className="player__grey-icon repeat-shuffle-icon"
				aria-label="Repeat"
			/>
		</div>
	);
};

export default PlayingControls;
