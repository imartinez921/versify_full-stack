import React from "react";
import { withRouter } from "react-router-dom";
import ArtistLinkContainer from "../artists/artist_link_container";

const CollabCard = ({
    song,
    history,
    displayAlbum,
    currentArtist,
}) => {

    const { id,
        title,
        albumId,
        albumImageUrl,
        songArtist,
        collabArtists,
    } =  song;

    const collabArtistNames = collabArtists.map(artist => {
        return <div className="artist-name" key={`${artist.name}+"collab"+${artist.id}`}><ArtistLinkContainer artist={artist} currentArtist={currentArtist}/>, </div>
    })

    const songArtistName = <ArtistLinkContainer artist={songArtist} currentArtist={currentArtist}/>

    const handleClick = (e) => {
        e.preventDefault();
        displayAlbum(albumId);
        return history.push(`/album/${albumId}`)
    }

    return (
        <div className="card album-card">
            <div className="album-card-art"
                onClick={handleClick}
            >
                <img src={albumImageUrl} alt="" />
            </div>
            <div className="card-title"
                onClick={handleClick}
            >
                {title}
            </div>
            <div className="card-subtitle">
                {collabArtistNames} {songArtistName} • Song
            </div>
        </div>
    )
}

export default withRouter(CollabCard);