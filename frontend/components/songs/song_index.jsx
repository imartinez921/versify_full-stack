import React from "react";
import { useState, useEffect, useRef } from "react";
import { freezeScroll, permitScroll } from "../../modules/dropdown_functions";
import SongCard from "./song_card";
import SongCardDropdownContainer from "./song_card_dropdown_container";


const SongIndex = ({
    currentUser,
    playlists,
    songs,
    history,
    params,
    source,
    songCardDropdownItems,
}) => {
    
    // Set local states for SongCardDropdownState and selectedSong
    const [songCardDropdownState, setSongCardDropdownState] = useState({ isOpen: false });
    const [selectedSong, setSelectedSong] = useState(null);
    // Set local state to remember which SongCard was clicked
    const [dropdownMenuPointer, setDropdownMenuPointer] = useState(null);
    
    // Updater functions for local states
    const updateSongCardDropdownState = (newState) => {
        setSongCardDropdownState(newState);
    };
    const updateSelectedSong = (newState) => {
        setSelectedSong(newState);
    };
    const updateDropdownMenuPointer = (newState) => {
        setDropdownMenuPointer(newState);
    };
    
    // Dropdowns must be closed and null selectedSong when SongIndex is first rendered
    useEffect( () => {
        setSongCardDropdownState({ isOpen: false })
        return () => {
            setSelectedSong(null);
            setSongCardDropdownState({ isOpen: false });
        }
    }, [params]);

    // Add event listeners when SongCardDropdown is open; remove when menu is closed
    useEffect(() => {
        const handler = (event) => {
            // Create a reference for the initial div created by SongCardDropdown
            const dropdown = document.querySelector("div.song-card-dropdown");
            if (
                songCardDropdownState.isOpen &&
                !dropdown.contains(event.target)
            ) {
                // Closing local state will also close all divs created by (therefore within) recursive SongCardDropdown
                updateSongCardDropdownState({ isOpen: false });
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            // Cleanup the event listener when component unmounts
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [songCardDropdownState]);

    const emptyPlaylist = (
        <div className="song-index song-index-empty">
            <h3>Add some songs to your playlist!</h3>
        </div>
    )

    // Relocate SongCardDropdown depending on location of SongCard
    const [dropdownPosition, setDropdownPosition] = useState({left: null, top: null});

    // Updater functions for local states
    const updateDropdownPosition = (newState) => {
        setDropdownPosition(newState);
    };

    let x, y;
    const placeSongCardDropdown = (e) => {
        const clickedEleBounds = e.target.getBoundingClientRect();
        x = clickedEleBounds.left; // Place dropdown at bottom-left of SongCard
        y = clickedEleBounds.top;
        setDropdownPosition({left: x, top: y});
    }

    const songIndex = (
        <div className={`song-index`+" " +source}>
            <div className="song-index-headings">
                <div className="song-index-heading-tracknum">
                    #
                </div>
                <div className="song-index-heading-title">
                    Title
                </div>
                <div className="song-index-heading-album">
                {source === "playlist" ? "Album" : null}
                </div>
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
                        placeSongCardDropdown={placeSongCardDropdown}
                        updateSongCardDropdownState={updateSongCardDropdownState}
                        updateSelectedSong={updateSelectedSong}
                        updateDropdownMenuPointer={updateDropdownMenuPointer}
                        dropdownPosition={dropdownPosition}
                        dropdownMenuPointer={dropdownMenuPointer}
                    />
                }))
                : null
            }
        </div>    
    )

    if (songCardDropdownState.isOpen) {
        freezeScroll('playlist-show');
    } else {
        permitScroll('playlist-show');
    }

    const depthLevel = 0;
    return <>
        {songs.length > 0 ? songIndex : emptyPlaylist}
        {songCardDropdownState.isOpen && <SongCardDropdownContainer 
                currentUser={currentUser}
                history={history}
                selectedSong={selectedSong}
                songCardDropdownState={songCardDropdownState}
                updateSongCardDropdownState={updateSongCardDropdownState}
                updateDropdownPosition={updateDropdownPosition}
                items={songCardDropdownItems}
                depthLevel={depthLevel}
                dropdownPosition={dropdownPosition}
                dropdownMenuPointer={dropdownMenuPointer}
            />
        }
    </>
}

export default SongIndex;