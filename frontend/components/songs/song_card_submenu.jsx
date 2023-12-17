import React from "react";
import SongCardDropdownContainer from "./song_card_dropdown_container";

const SongCardSubmenu = ({
    currentUser,
    selectedSong,
    songCardDropdownState,
    submenus,
    submenuState,
    depthLevel,
    dropdownPosition,
    updateSongCardDropdownState,
}) => {
    depthLevel += 1;
    const dropdownClass = depthLevel > 0 ? "dropdown-submenu" : "";

    return (
        <div
            className={`${dropdownClass} ${
                submenuState.isOpen ? "show" : ""
            }`}
            data-dropdown
        >
            {submenus.map((submenu, index) => {
                return (
                    <SongCardDropdownContainer
                        key={`${index}+${depthLevel}+"subm"`}
                        currentUser={currentUser}
                        selectedSong={selectedSong}
                        songCardDropdownState={songCardDropdownState}
                        items={submenu}
                        depthLevel={depthLevel}
                        dropdownPosition={dropdownPosition}
                        updateSongCardDropdownState={
                            updateSongCardDropdownState
                        }
                    />
                );
            })}
        </div>
    );
};

export default SongCardSubmenu;
