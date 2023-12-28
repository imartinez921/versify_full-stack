import React from 'react';

import ArtistLink from '../artists/artist_link';

const AlbumHeader = ({ album,
}) => {

  const { id,
      title,
      genre,
      year,
      albumArtist,
      albumPhotoUrl,
      number,
      hrs,
      mins,
  } = album;

  const songWord = number === 1 ? "song" : "songs";

  const hours = hrs === 0 ? "" : `${hrs} h `;

  const header = (<>
    <div className="album-art">
      <img src={albumPhotoUrl} />
    </div>
    <div className="album-header-text">
      <h2>ALBUM</h2>
      <div className="album-title">
        {title}
      </div>
      <div className="album-description">
        <h3>
          <ArtistLink artist={albumArtist} currentArtist={null} />
          &nbsp;• {genre} • {year} • {number} {songWord}, {hours} {mins} min
        </h3>
      </div>
    </div>
  </>)

  return albumArtist ? header : null   
  // ArtistLink wil error out immediately if albumArtist prop is not yet passed
};

export default AlbumHeader;