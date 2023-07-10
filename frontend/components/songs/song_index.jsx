import React from "react";
import { useState, useEffect } from "react";
import SongCard from "./song_card";
import SongCardDropdownContainer from "./song_card_dropdown_container";


const SongIndex = ({
    source,
    playlists,
    songs,
    history,
    params,
}) => {
    
    // Set local states for SongCardDropdownState and selectedSong
    const [songCardDropdownState, setSongCardDropdownState] = useState({ isOpen: false });
    const [selectedSong, setSelectedSong] = useState(null);
    
    // Updater functions for local states
    const updateSongCardDropdownState = (newState) => {
        setSongCardDropdownState(newState);
    };
    const updateSelectedSong = (newState) => {
        setSelectedSong(newState);
    };
    
    useEffect( () => {
        setSongCardDropdownState({ isOpen: false }) // upon first mount
        return () => {
            setSelectedSong(null);
            setSongCardDropdownState({ isOpen: false });
        }
    }, [params]);

    let songCardDropdownItems;
    if (source === "playlist") {
        songCardDropdownItems = [
            {
                title: "Remove from this playlist"
            }, 
            {
                title: "Add to playlist",
                submenu: [playlists],
            },
        ]
    } else if (source === "album") {
        songCardDropdownItems = [
            {
                title: "Add to playlist",
                submenu: [playlists], 
                // Enclose array of playlists in an array since dropdown uses recursive .map function on items prop
            }
        ]
    };

    const songIndex = (
        <div className={`song-index`+" " +source}>
            <div className="song-index-headings">
                <div className="song-index-heading-tracknum">
                    #
                </div>
                <div className="song-index-heading-title">
                    Title
                </div>
                {source === "playlist" ? (
                    <div className="song-index-heading-album">
                        Album
                    </div>
                    ) : null
                }
                <div className="song-index-heading-liked">
                    &#128153;
                </div>
                <div className="song-index-heading-duration">
                    &#9201;
                </div>
                <div className="song-index-heading-menu">
                </div>
            </div>
            {songs.length > 0 ? 
                (songs.map( (song, index) => {
                    return <SongCard
                        key={`${source} + ${song.id} + ${index}`} 
                        source={source}
                        song={song}
                        history={history}
                        index={index}
                        songCardDropdownState={songCardDropdownState}
                        updateSongCardDropdownState={updateSongCardDropdownState}
                        updateSelectedSong={updateSelectedSong}
                    />
                }))
                : null
            }
        </div>    
    )

    const emptyPlaylist = (
        <div className="song-index song-index-empty">
            <h3>Add some songs to your playlist!</h3>
        </div>
    )

    // const depthLevel = 0;
    return <>
        {songs.length > 0 ? songIndex : emptyPlaylist}
        {/* {songCardDropdownState.isOpen && <SongCardDropdownContainer 
                source={source} 
                selectedSong={selectedSong} 
                history={history}
                params={params}
                songCardDropdownState={songCardDropdownState}
                updateSongCardDropdownState={updateSongCardDropdownState}
                items={songCardDropdownItems}
                depthLevel={depthLevel}
            />
        } */}
    </>
}

export default SongIndex;