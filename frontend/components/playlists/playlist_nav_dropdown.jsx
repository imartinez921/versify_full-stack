import React, { useEffect } from "react";
import PlaylistEditModal from "./playlist_edit_modal";

const PlaylistNavDropdown = ({
    currentPlaylist,
    playlistNavDropdownState,
    playlistEditModalState,
    closePlaylistNavDropdown,
    openPlaylistEditModal,
    closePlaylistEditModal,
    fetchPlaylists,
    editPlaylist,
    destroyPlaylist,
    history,
}) => {

    useEffect( () => {
        setTimeout( () => {
            if (playlistNavDropdownState.isOpen && !playlistEditModalState.isOpen) {
                window.addEventListener('click', closePlaylistNavDropdown);
            } 
        }, 0)
        // if (playlistNavDropdownState.isOpen) window.addEventListener('click', closePlaylistNavDropdown);
        
        return () => {
            closePlaylistNavDropdown();
            window.removeEventListener('click', closePlaylistNavDropdown)
        }
    }, [])


    const keepDropdownOpen = (event) => {
        event.stopPropagation();
        // prevents re-rendering of parent and keeps menu open

        switch (event.target.innerText){
            case "Edit details":
                openPlaylistEditModal();
            case "Delete":
                destroyPlaylist(currentPlaylist.id)
                    .then(fetchPlaylists())
                return history.push('/home')
            default: null;
        }
    }

    return (
        <>
            <div className="dropdown-item playlist-dropdown" onClick={keepDropdownOpen}>
                <button className="playlist-dropdown-button">Edit details</button>
                <button className="playlist-dropdown-button">Delete </button>
            </div>
            {playlistEditModalState.isOpen && <PlaylistEditModal
                playlistEditModalState={playlistEditModalState}
                closePlaylistNavDropdown={closePlaylistNavDropdown}
                closePlaylistEditModal={closePlaylistEditModal}
                currentPlaylist={currentPlaylist}
                editPlaylist={editPlaylist}
            />}
        </>
    )
}

export default PlaylistNavDropdown;