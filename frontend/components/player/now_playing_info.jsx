import React, { useEffect } from "react";
import AlbumLinkContainer from "../albums/album_link_container";
import ArtistLinkContainer from "../artists/artist_link_container";

const NowPlayingInfo = ({
	audioRef,
	track,
	trackProgress,
	history,
	length, // Refreshes component whenever queue changes
	isPlaying,
	updateTrackProgress,
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
	useEffect(() => {
		updateTrackProgress(audioRef.current.currentTime);
	}, [isPlaying]);
	return (
		<div className="now-playing">
			{!!track.title ? (
				<>
					<div
						className="now-playing-art"
						alt={`track artwork for ${title} by ${songArtist.name}`}
					>
						{albumImageUrl && <img src={albumImageUrl} />}
					</div>
					<div className="now-playing-info">
						<div className="now-playing-title">
							<AlbumLinkContainer
								album={{
									id: track.albumId,
									name: title ,
								}}
								currentAlbum={null}
								history={history}
							/>
						</div>
						<div className="now-playing-artist">
							<ArtistLinkContainer
								artist={songArtist}
								currentArtist={null}
								history={history}
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
