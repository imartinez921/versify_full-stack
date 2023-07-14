import React, { useState, useEffect, useRef } from "react";

import SongCardSubmenu from "./song_card_submenu";
import SongCardDropdownItem from "./song_card_dropdown_item";

const SongCardDropdown = ({
    currentItem,
    playlists,
    currentUser,
    history,
    selectedSong,
    songCardDropdownState,
    updateSongCardDropdownState,
    items,
    depthLevel,
    dropdownPosition,
    removePlaylisted,
    createNewPlaylisted,
    createPlaylist,
    displayPlaylist,
}) => {
    // Set local state for SongCardSubmenu
    let dropdownRef = useRef();
    const [submenuState, setSubmenuState] = useState({ isOpen: false });

    // Add event listeners when menu is open; remove when menu is closed
    useEffect(() => {
        const handler = (event) => {
            if (
                songCardDropdownState.isOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
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
    }, [songCardDropdownState]);

    const toggleSubmenuAndPlaceDropdown = (e) => {
        e.preventDefault();
        setSubmenuState({ isOpen: !submenuState.isOpen });
    };

    let depthStyling;
    if (depthLevel > 0) {
        depthStyling = {
            maxHeight: "250px",
            overflowY: "scroll",
            width: "250px",
        };
    }

    return (
        <div
            className="song-card-dropdown dropdown-item"
            data-dropdown
            ref={dropdownRef} // Note that I didn't change the position of the ref in both commits
            style={{
                left: `${dropdownPosition.left}px`,
                top: `${dropdownPosition.top}px`,
                ...depthStyling,
            }}
        >
            {items.map((item, index) =>
                item.submenu ? (
                    // If a submenu exists, create button for submenu title and pass submenu to SongCardSubmenu
                    <>
                        <button
                            className="song-card-dropdown-item"
                            key={`${selectedSong.playlistedId}+${depthLevel}+${item.title}+"btn"`}
                            onClick={toggleSubmenuAndPlaceDropdown}
                        >
                            {item.title}{" "}
                            <span key={`${selectedSong.playlistedId}`}>
                                &raquo;
                            </span>
                        </button>
                        <SongCardSubmenu
                            key={`${selectedSong.playlistedId}+${depthLevel}+${item.title}+"subm"`}
                            history={history}
                            currentUser={currentUser}
                            selectedSong={selectedSong}
                            songCardDropdownState={songCardDropdownState}
                            submenus={item.submenu}
                            submenuState={submenuState}
                            depthLevel={depthLevel}
                            dropdownPosition={dropdownPosition}
                            updateSongCardDropdownState={
                                updateSongCardDropdownState
                            }
                        />
                    </>
                ) : (
                    <SongCardDropdownItem // Else, create just a button
                        key={`${selectedSong.playlistedId}+${item.id}+${depthLevel}+"no-subm"`}
                        currentItem={currentItem}
                        playlists={playlists}
                        history={history}
                        currentUser={currentUser}
                        index={index - 1} // Since the first item is "Create new playlist"
                        selectedSong={selectedSong}
                        updateSongCardDropdownState={
                            updateSongCardDropdownState
                        }
                        item={item}
                        depthLevel={depthLevel}
                        dropdownPosition={dropdownPosition}
                        removePlaylisted={removePlaylisted}
                        createNewPlaylisted={createNewPlaylisted}
                        createPlaylist={createPlaylist}
                        displayPlaylist={displayPlaylist}
                    />
                )
            )}
        </div>
    );
};

export default SongCardDropdown;
