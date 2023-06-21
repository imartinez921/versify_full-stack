import React, { useEffect } from "react";
import PlaylistHeader from "./playlist_header";
import PlaylistNav from "./playlist_nav";
import SongIndex from "../songs/song_index";


const PlaylistShow = ({ 
    currentPlaylist,
    params,
    history,
    playlists,
    playlistSongs,
    currentUser,
    displayPlaylist,
    clearCurrent,
    ... props
}) => {

    const { id, 
        title,
        description,
    } = currentPlaylist;

// Upon mount: fetch playlist from database based on params :id
// Upon dismount: clear currentItem slice of state
    useEffect( () => {
        displayPlaylist(params.id); 
        // Maybe there's a way to check whether the params.id has changed from the previous and then trigger re-render

        return () => clearCurrent();
    }, [params]);

    const playlistShow = title ? (
        <div className="playlist-show">
            <div className="playlist-header">
                <PlaylistHeader title={title} description={description}
                    currentUser={currentUser} />
            </div>
            <div className="playlist-nav">
                <PlaylistNav 
                    currentPlaylist={currentPlaylist} 
                    history={history}
                    {...props}
                /> 
            </div>
                <SongIndex
                    source="playlist" 
                    playlists={playlists}
                    songs={playlistSongs} 
                    history={history}
                    params={params}
                />
        </div>
        ) : null;

    return title ? playlistShow : null;
}

export default PlaylistShow;