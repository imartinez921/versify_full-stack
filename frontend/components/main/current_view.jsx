import React from "react";

import HomeContainer from '../home/home_container.jsx'
import PlaylistShowContainer from "../playlists/playlist_show_container";
import ArtistShowContainer from "../artists/artist_show_container";
import AlbumShowContainer from "../albums/album_show_container.js";

const CurrentView = (props) => {
    const currentViewType = () => {
        const { path,
            params,
            currentUser,
            history,
        } = props;

        switch (path) {
            case "/home":
                return <HomeContainer 
                    params={params} history={history} path={path}/>;
            case "/playlist/:id":
                return <PlaylistShowContainer
                    params={params} currentUser={currentUser} history={history}/>;
            case "/artist/:id":
                return <ArtistShowContainer
                    params={params} currentUser={currentUser} history={history}/>;
            case "/album/:id":
                return <AlbumShowContainer
                    params={params} currentUser={currentUser} history={history}/>;
            default:
                return <HomeContainer 
                    params={params} history={history} path={path}/>;
        }
    }


    return (
        <>
            { currentViewType() }
        </>
    )

}

export default CurrentView;