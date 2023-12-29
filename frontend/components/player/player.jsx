import React, { useEffect, useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import NowPlayingInfo from "./now_playing_info";
import PlayingControls from "./playing_controls";

const Player = ({
	isPlaying,
	currentTrack,
	trackIndex,
	songs, // songs of the current view
	hasQueue,
	history,
	toNextTrack,
	toPrevTrack,
	toPlayView,
	toTogglePlay,
	toPushPlay,
}) => {
	// Set local states
	const [trackProgress, setTrackProgress] = useState(0); // progress bar
	// const [isShuffling, setIsShuffling] = useState(false);

	const updateTrackProgress = (time) => {
		return setTrackProgress(time);
	};

	// Set current track
	let audioRef = useRef(new Audio()); // creates empty HTMLAudioElement
	let audioSrc;

	useEffect(() => {
		audioSrc = currentTrack?.audioUrl || "";
		audioRef.current.src = audioSrc;
		audioRef.current.currentTime = trackProgress;
		tryPlayListener();
		audioRef.current?.addEventListener("ended", whenTrackEnds);

		return () => {
			audioRef.current?.pause();
			audioRef.current.removeEventListener("loadeddata", tryPlay);
			audioRef.current.removeEventListener("ended", whenTrackEnds);
		};
	}, [currentTrack, trackIndex]); // on first song + in case same song is queued twice

	// Safely play audio only when it is loaded
	const tryPlay = () => {
		if (audioRef.current.readyState === 4) {
			audioRef.current.play();
		}
	};
	const tryPlayListener = () => {
		audioRef.current.addEventListener("loadeddata", tryPlay);
	};

	// Set up play/pause behavior;
	useEffect(() => {
		if (isPlaying) {
			tryPlayListener();
			audioRef.current.play();
		} else {
			audioRef.current.pause();
		}
		return () => {
			audioRef.current.removeEventListener("loadeddata", tryPlay);
		};
	}, [isPlaying]);

	// Behavior when changing tracks
	const afterFirstRender = useRef(false); // prevent auto-play
	useEffect(() => {
		if (isPlaying && afterFirstRender.current) {
			audioRef.current.pause();
		}
		audioRef.current.src = audioSrc;
		setTrackProgress(audioRef.current.currentTime);
		if (isPlaying) {
			audioRef.current.play();
		}
		if (!afterFirstRender) afterFirstRender.current = true;
	}, [trackIndex]);

	// Behavior when track ends
	const whenTrackEnds = () => {
		audioRef.current?.pause();
		hitNext();
	};

	// Behavior when user leaves the window
	window.addEventListener("unload", () => {
		audioElement.pause();
	});

	// Create PlayingControls functions
	const hitPrev = () => {
		if (isPlaying) audioRef.current.pause();
		toPrevTrack();
	};
	const hitNext = () => {
		if (isPlaying) audioRef.current.pause();
		toNextTrack();
	};

	// const toggleShuffle = () => {
	// 	// TODO: Re-work this logic in NowPlayingReducer
	// 	if (isShuffling) return setIsShuffling(false);
	// 	if (tracks.length > 1) {
	// 		setIsShuffling(true);
	// 		setTrackIndex(Math.floor(Math.random() * tracks.length));
	// 	}
	// };

	const objToQueue = {
		viewSongs: songs,
		sourcedFrom: history.location.pathname,
	}; // provides linkback to view currently playing

	return (
		<div className="player-container">
			<NowPlayingInfo
				audioRef={audioRef}
				track={currentTrack}
				trackProgress={trackProgress}
				history={history}
				isPlaying={isPlaying}
			/>
			<PlayingControls
				hasQueue={hasQueue}
				objToQueue={objToQueue}
				isPlaying={isPlaying}
				toPlayView={toPlayView}
				togglePlay={toTogglePlay}
				toPushPlay={toPushPlay}
				hitPrev={hitPrev}
				hitNext={hitNext}
				updateTrackProgress={updateTrackProgress}
				// toggleShuffle={toggleShuffle}
			/>
			<div className="player-right"></div>
		</div>
	);
};

export default withRouter(Player);
