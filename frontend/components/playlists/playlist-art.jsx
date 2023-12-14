import React from "react";

const PlaylistArt = ({ children }) => {
	const extractedImageUrls = children?.map(
		(playlistSong) => playlistSong.albumImageUrl
	);
	const pluckFourUniqueUrls = [...new Set(extractedImageUrls)].slice(0, 4);
	let artworkMap =
		pluckFourUniqueUrls.length < 4
			? pluckFourUniqueUrls.slice(0, 1)
			: pluckFourUniqueUrls;
	if (artworkMap.length === 0)
		artworkMap = [
			"https://versify-dev.s3.amazonaws.com/images/ux/blank-art.png",
		];

	const uniqueArtGrid = artworkMap.map((artUrl, idx) => {
		return <img src={artUrl} key={idx} />;
	});
	return uniqueArtGrid.length === 1 ? (
		<div className="playlist-art-1">{uniqueArtGrid}</div>
	) : (
		<div className="playlist-art-4">{uniqueArtGrid}</div>
	);
};

export default PlaylistArt;
