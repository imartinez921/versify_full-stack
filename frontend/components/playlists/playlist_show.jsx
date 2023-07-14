import React, { useEffect } from "react";
import PlaylistHeader from "./playlist_header";
import PlaylistNav from "./playlist_nav";
import SongIndex from "../songs/song_index";

const PlaylistShow = ({
    currentPlaylist,
    urlParams,
    currentUser,
    history,
    playlists,
    playlistSongs,
    source,
    songCardDropdownItems,
    displayPlaylist,
    clearCurrent,
    ...props
}) => {
    const { id, title, description } = currentPlaylist;

    // Upon mount: fetch playlist from database based on urlParams :id
    // Upon dismount: clear currentItem slice of state
    useEffect(() => {
        displayPlaylist(urlParams.id);
        // Maybe there's a way to check whether the urlParams.id has changed from the previous and then trigger re-render

        return () => clearCurrent();
    }, [urlParams]);

    const playlistShow = title ? (
        <div 
            id="playlist-show"
            className="playlist-show">
            <div className="playlist-header">
                <PlaylistHeader
                    title={title}
                    description={description}
                    currentUser={currentUser}
                />
            </div>
            <div className="playlist-nav">
                <PlaylistNav
                    currentPlaylist={currentPlaylist}
                    history={history}
                    {...props}
                />
            </div>
            <SongIndex
                currentUser={currentUser}
                playlists={playlists}
                songs={playlistSongs}
                history={history}
                urlParams={urlParams}
                source={source}
                songCardDropdownItems={songCardDropdownItems}
            />
        </div>
    ) : null;

    return title ? playlistShow : null;
};

export default PlaylistShow;
