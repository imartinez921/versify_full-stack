import React from "react";
import AlbumCard from "./album_card";


const AlbumIndex = ({ albums,
    displayAlbum,
}) => {
    
    return <div className="album-index">
            <div className="album-index-header">
                <h2>
                    Albums
                </h2>
            </div>
            <div className="album-index-grid">
                {albums.map( album => (
                    <AlbumCard key={`${album.id}+${album.title}`} 
                        album={album} 
                        displayAlbum={displayAlbum}
                    />
                ))}
            </div>
        </div>
}

export default AlbumIndex;