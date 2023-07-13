import React from "react";

const SongCardDropdownItem = ({
    currentItem,
    playlists,
    currentUser,
    history,
    index,
    selectedSong,
    updateSongCardDropdownState,
    item,
    depthLevel,
    removePlaylisted,
    createNewPlaylisted,
    createPlaylist,
}) => {
    const runSongAction = (e) => {
        if (e.target.innerText === "Remove from this playlist") {
            updateSongCardDropdownState({ isOpen: false });
            return removePlaylisted(selectedSong.playlistedId);
        } else if (e.target.innerText === "Create new playlist") {
            updateSongCardDropdownState({ isOpen: false });
            const newPlaylist = {
                title: `${selectedSong.title}`,
                description: "Please add a description",
                user_id: currentUser.id, // Database/schema uses snake_case
            };
            createPlaylist(newPlaylist)
                .then((playlistId) =>
                    createNewPlaylisted(selectedSong.id, playlistId)
                )
                .then((playlistId) => history.push(`/playlist/${playlistId}`));
        } else if (depthLevel === 1) {
            updateSongCardDropdownState({ isOpen: false });
            let playlist = playlists[index];
            createNewPlaylisted(selectedSong.id, playlist.id)
                .then((playlistId) => history.push(`/playlist/${playlistId}`)
            );
        }
        // } else if (e.target.innerText === "Add to queue") {
        //     updateSubmenuState({ isOpen: false });
        // }
    };

    return (
        <button
            className="song-card-dropdown-item"
            key={`${index}+${item.title}+"no-subm"`}
            type="button"
            onClick={runSongAction}
        >
            {item.title}{" "}
        </button>
    );
};

export default SongCardDropdownItem;
