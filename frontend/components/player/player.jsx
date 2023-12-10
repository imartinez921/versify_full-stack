import React, { useEffect, useRef, useState } from "react";
import NowPlayingInfo from "./now_playing_info";
import PlayingControls from "./playing_controls";

const Player = ({ tracks, isPlaying, toTogglePlay }) => {
	// Set local states
	const [trackIndex, setTrackIndex] = useState(0);
	const [trackProgress, setTrackProgress] = useState(0); // progress bar
	const [isShuffling, setIsShuffling] = useState(false);

	const updateTrackProgress = (time) => {
		return setTrackProgress(time);
	};

	// Set current track
	let currentTrack = tracks ? tracks[trackIndex] : null;
	let audioRef = useRef(new Audio()); // creates empty HTMLAudioElement
	let audioSrc;

	useEffect(() => {
		audioSrc = currentTrack ? currentTrack.audioUrl : "";
		audioRef.current.src = audioSrc;
	}, [currentTrack]);

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
		}
	}, [isPlaying]);

	// Set up behavior when changing tracks
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

	// Create PlayingControls functions
	const toPrevTrack = () => {
		if (isPlaying) audioRef.current.pause();
		if (trackIndex - 1 < 0) {
			setTrackIndex(tracks.length - 1);
		} else {
			setTrackIndex(trackIndex - 1);
		}
	};
	const toNextTrack = () => {
		if (isPlaying) audioRef.current.pause();
		if (trackIndex < tracks.length - 1) {
			setTrackIndex(trackIndex + 1);
		} else {
			setTrackIndex(0);
		}
	};
	const toggleShuffle = () => {
		// TODO: Re-work this logic
		if (isShuffling) return setIsShuffling(false);
		if (tracks.length > 1) {
			setIsShuffling(true);
			setTrackIndex(Math.floor(Math.random() * tracks.length));
		}
	};

	return (
		<div className="player-container">
			<NowPlayingInfo
				audioRef={audioRef}
				track={currentTrack}
				trackProgress={trackProgress}
				isPlaying={isPlaying}
				updateTrackProgress={updateTrackProgress}
			/>
			<PlayingControls
				isPlaying={isPlaying}
				togglePlay={toTogglePlay}
				toPrevTrack={toPrevTrack}
				toNextTrack={toNextTrack}
				toggleShuffle={toggleShuffle}
			/>
			<div className="player-right"></div>
		</div>
	);
};

export default Player;
