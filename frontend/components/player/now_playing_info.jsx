import React, { useEffect } from "react";
import AlbumLinkContainer from "../albums/album_link_container";
import ArtistLinkContainer from "../artists/artist_link_container";

const NowPlayingInfo = ({
	track,

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
									name: title,
								}}
							/>
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
