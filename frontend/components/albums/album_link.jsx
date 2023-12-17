import React from "react";

const AlbumLink = ({
    album,
    currentAlbum,
    history,
}) => {

    const { id,
        name,
    } = album;

    const handleClick = (e) => {
        e.preventDefault();
        return history.push(`/album/${id}`);
    }

    if (currentAlbum === null) {
        return <a onClick={handleClick} className="artist-link">{name}</a>
    } else {
        if (name === currentAlbum.name) {
            return <span>{name}</span>
        } else {
            return <a onClick={handleClick} className="artist-link">{name}</a>
        }
    }
}

export default AlbumLink;