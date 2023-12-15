import React from "react";

const SongCardDropdownItem = ({
    currentItem,
    playlists,
    currentUser,
    selectedIndex,
    selectedSong,
    updateSongCardDropdownState,
    item,
    depthLevel,
    removePlaylisted,
    createNewPlaylisted,
    createPlaylist,
    displayPlaylist,
    toQueueView,
}) => {
    const runSongAction = (e) => {
        if (e.target.innerText === "Add to queue") {
            return toQueueView();
        } else if (e.target.innerText === "Remove from this playlist") {
            updateSongCardDropdownState({ isOpen: false });
            return removePlaylisted(selectedSong.playlistedId);
        } else if (e.target.innerText === "Create new playlist") {
            updateSongCardDropdownState({ isOpen: false });
            const newPlaylist = {
                title: `${selectedSong.title}`,
                description: "Please add a description",
                user_id: currentUser.id, // Database/schema uses snake_case
            };
            createPlaylist(newPlaylist).then((playlistId) =>
                createNewPlaylisted(selectedSong.id, playlistId)
            );
        } else if (depthLevel === 1) {
            updateSongCardDropdownState({ isOpen: false });
            let selectedPlaylist = playlists[selectedIndex];
            createNewPlaylisted(selectedSong.id, selectedPlaylist.id).then(
                (selectedPlaylistId) => {
                    // If we are currently viewing a playlist (not an album), 
                    // and we are adding the song to that current playlist, 
                    // then re-fetch playlist
                    if (currentItem.id === selectedPlaylistId) {
                        displayPlaylist(selectedPlaylistId);
                    }
                }
            );
        }
        // } else if (e.target.innerText === "Add to queue") {
        //     updateSubmenuState({ isOpen: false });
        // }
    };

    return (
        <button
            className="song-card-dropdown-item"
            key={`${selectedIndex}+${item.title}+"no-subm"`}
            type="button"
            onClick={runSongAction}
        >
            {item.title}{" "}
        </button>
    );
};

export default SongCardDropdownItem;
