import React, { useState, useEffect, useRef } from "react";

import SongCardSubmenu from "./song_card_submenu";


const SongCardDropdown = ({
    source,
    selectedSong,
    history,
    params,
    updateSongCardDropdownState,
    items,
    depthLevel,
    removePlaylisted,
    createNewPlaylisted,
 }) => {

    // Set local state for SongCardSubmenu
     const [submenuState, setSubmenuState] = useState({ isOpen: false });
     let dropdownRef = useRef();

    // Add event listeners when menu is open; remove when menu is closed
    useEffect(() => {
        const handler = (event) => {
            if (submenuState.isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                updateSongCardDropdownState({ isOpen: false });
                setSubmenuState({ isOpen: false });
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            // Cleanup the event listener when component unmounts
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
            };
    }, [submenuState]);

    const keepParentMenuOpen = (e) => {
        e.stopPropagation();
    };
    
    // let { x, y };
    const toggleSubmenu = (e) => {
        e.preventDefault();
        keepParentMenuOpen(e);
        const result = e.target.getBoundingClientRect();
        console.log(result);
        console.log(selectedSong);
        setSubmenuState({ isOpen: !submenuState.isOpen });
    };

    const runSongActions = (e) => {
        if (source === "playlist") {
            switch (e.target.innerText) {
                case "Remove from this playlist":
                    updateSongCardDropdownState( {isOpen: false });
                    return removePlaylisted(selectedSong.playlistedId)
                case "Add to playlist":
                    setSubmenuState({ isOpen: true });
                default: // Otherwise, it's a playlist
                    updateSongCardDropdownState( {isOpen: false });
                    return createNewPlaylisted(selectedSong.id, playlistId)
            }
        }


    }

    console.log("depthLevel in SongCardDropdown", depthLevel)
    console.log("ITEMS in dropdown", items)
    return (
        <div className="song-card-dropdown" data-dropdown ref={dropdownRef}> 
            {items.map( (item, index) => (
                item.submenu ? (
                // If a submenu exists, create button for submenu title and pass submenu to SongCardSubmenu
                    <> 
                        <button className="song-card-dropdown-item"
                            key={`${index}+${item.title}+"subm"`}
                            onClick={toggleSubmenu}
                        >
                            {item.title}{' '}
                            {/* {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />} */}
                            <span>&raquo;</span>
                        </button>
                        <SongCardSubmenu
                            key={`${index}+"subm"+${depthLevel}+${item.title}`}
                            submenus={item.submenu}
                            submenuState={submenuState}
                            depthLevel={depthLevel}
                            updateSongCardDropdownState={updateSongCardDropdownState}
                        />
                    </>
                ) : ( // Else, create just a button
                    <>
                        <button className="song-card-dropdown-item"
                            key={`${index}+${item.title}+"no-subm"`}
                            type="button"
                            onClick={runSongActions}
                            // ref={depthLevel > 0 ? el => playlistRefs.current.push([el, index]) : null}

                        >
                            {item.title}{' '}
                            {console.log("BUTTON THANG", item.title, "- index", index, "- depth level", depthLevel)}
                        </button>
                    </>)
                )
            )}
        </div>
    )
}

export default SongCardDropdown;