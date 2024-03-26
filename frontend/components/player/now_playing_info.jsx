import React, { useEffect } from "react";
import ArtistLinkContainer from "../artists/artist_link_container";

const NowPlayingInfo = ({
	track,
	trackIndex,
	queueSources,
	history,
}) => {
	if (!track) {
		track = {
			title: "",
			albumId: "",
			albumImageUrl: "",
			songArtist: "",
		};
	}
	const { title, albumId, albumImageUrl, songArtist } = track;

	const handleOnClickSongName = () => {
		let currSource = queueSources[trackIndex];
		if (history.location.pathname !== currSource) history.push(`${queueSources[trackIndex].sourcedFrom}`);
	}
	const handleOnClickAlbumArt = () => {
		let currSource = queueSources[trackIndex];	
		if (history.location.pathname!== currSource) history.push(`/album/${albumId}`);
	}

	return (
		<div className="now-playing">
			{!!track.title ? (
				<>
					<div
						className="now-playing-art"
						alt={`track artwork for ${title} by ${songArtist.name}`}
						onClick={handleOnClickAlbumArt}
					>
						{albumImageUrl && <img src={albumImageUrl} />}
					</div>
					<div className="now-playing-info">
						<div className="now-playing-title" onClick={handleOnClickSongName}>
							{title}
						</div>
						<div className="now-playing-artist">
							<ArtistLinkContainer
								artist={songArtist}
							/>
						</div>
					</div>
					<div className="now-playing-buttons"></div>
				</>
			) : null}
		</div>
	);
};

export default NowPlayingInfo;
