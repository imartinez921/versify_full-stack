import React, {useEffect} from "react";

import ArtistIndexContainer from "../artists/artist_index_container";

const Home = ({
	clearCurrent,
}) => {

	useEffect(() => {
		clearCurrent();
	}, []);
	return (
		<div className="home">
			<div className="home-header">Your Versify</div>
			<div className="artist-index-header">
				<h1>All Artists</h1>
			</div>
			<ArtistIndexContainer />
		</div>
	);
};

export default Home;
