import React, { useEffect, useState, useRef } from "react";

import { RxDotsHorizontal } from "react-icons/rx";
import ArtistLinkContainer from "../artists/artist_link_container";
import AlbumLinkContainer from "../albums/album_link_container";

const SongCard = ({
    source,
    song,
    index,
    songCardDropdownState,
    dropdownMenuPointer,
    placeSongCardDropdown,
    updateSongCardDropdownState,
    updateSelectedSong,
    updateDropdownMenuPointer,
    dropdownPosition,
}) => {
    const {
        id,
        title,
        albumId,
        album,
        mins,
        secs,
        playlistedId,
        songArtist,
        collabArtists,
        audioUrl,
    } = song;

    // Set up song info for display
    let tracknum = source === "album" ? song.tracknum : index + 1;

    const collabArtistNames = collabArtists.map((artist) => (
        <div
            className="artist-name"
            key={`${artist.name}+"collab"+${artist.id}`}
        >
            <ArtistLinkContainer
            />
            ,&nbsp;
        </div>
    ));

    const songArtistName = (
        <div
            className="artist-name"
            key={`${songArtist.name}+"track"+${songArtist.id}+${tracknum}`}
        >
            <ArtistLinkContainer
            />
        </div>
    );

    const toggleSongCardDropdown = (e) => {
        e.preventDefault();
        updateSelectedSong(song);
        if (!songCardDropdownState.isOpen) {
            placeSongCardDropdown(e);
            updateSongCardDropdownState({ isOpen: true });
        } else if (dropdownMenuPointer === index) {
            // if user had clicked on the same SongCard, toggle dropdown
            updateSongCardDropdownState(!songCardDropdownState.isOpen);
        } else if (
            songCardDropdownState.isOpen &&
            dropdownMenuPointer !== index
        ) {
            // if user had clicked on a different SongCard, relocate the dropdown
            updateSongCardDropdownState({ isOpen: false });
            placeSongCardDropdown(e);
            updateSongCardDropdownState({ isOpen: true });
        }
        updateDropdownMenuPointer(index);
        updateSelectedSong(song);
    };

    return (
        <div className="song-card">
            <div className="song-card-tracknum">{tracknum}</div>
            <div className="song-card-title-artist-block">
                <div className="song-card-title">{title}</div>
                <div className="song-card-artist">
                    {collabArtistNames}
                    {songArtistName}
                </div>
            </div>
            <div className="song-card-album">
                {source === "playlist" ? 
                    <AlbumLinkContainer
                        album={{
                            id: albumId,
                            name: album,
                        }}
                    />
                    : null}
            </div>
            <div className="song-card-liked">&hearts;</div>
            <div className="song-card-duration">
                {mins}:{secs}
            </div>
            <div
                className="song-card-menu-dots"
                onClick={toggleSongCardDropdown}
            >
                <RxDotsHorizontal />
            </div>
        </div>
    );
};

export default SongCard;
