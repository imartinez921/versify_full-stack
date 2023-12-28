import React, { useRef } from "react";

import HomeContainer from "../home/home_container.jsx";
import PlaylistShowContainer from "../playlists/playlist_show_container";
import ArtistShowContainer from "../artists/artist_show_container";
import AlbumShowContainer from "../albums/album_show_container.js";

const CurrentView = (props) => {
    const currentViewType = () => {
        const { path, params, currentUser } = props;

        switch (path) {
            case "/home":
                return (
                    <HomeContainer
                    />
                );
            case "/playlist/:id":
                return (
					<PlaylistShowContainer
						currentUser={currentUser}
						params={params}
					/>
				);
            case "/artist/:id":
                return (
                    <ArtistShowContainer
                        currentUser={currentUser}
                        params={params}
                    />
                );
            case "/album/:id":
                return (
					<AlbumShowContainer
						currentUser={currentUser}
						params={params}
					/>
				);
            default:
                return (
                    <HomeContainer
                    />
                );
        }
    };

    return <>{currentViewType()}</>;
};

export default CurrentView;
