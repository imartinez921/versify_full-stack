import React from "react";
import SongCardDropdownContainer from "./song_card_dropdown_container";


const SongCardSubmenu = ({
    submenus,
    submenuState,
    depthLevel,
    updateSongCardDropdownState,
}) => {

    depthLevel += 1;
    const dropdownClass = depthLevel > 0 ? "dropdown-submenu" : "";

    return (
        <ul className={`song-card-dropdown ${dropdownClass} ${submenuState.isOpen ? "show" : ""}`}
            data-dropdown
        >
            {submenus.map( (submenu, index) => {
                return <SongCardDropdownContainer 
                    key={`${index}+${depthLevel}+"subm"`}
                    items={submenu}
                    depthLevel={depthLevel}
                    updateSongCardDropdownState={updateSongCardDropdownState}
                />
            })}
        </ul>
    )




};

export default SongCardSubmenu;