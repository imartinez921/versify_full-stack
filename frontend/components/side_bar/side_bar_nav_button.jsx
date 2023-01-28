import React from 'react';
import { showPlaylist } from '../../util/playlists_util';

const SideBarNavButton = (props) => {
    // eg. Home button, Search button
    const { text,
        icon,
    } = props;

    const clickToShowPlaylist = (e) => {
        e.preventDefault();
        showPlaylist(props.playlistId);
        // displayPlaylist(props.playlistId);
        // ^ create sidebar container for mapdispatchtoprops to execute dispatch
    }

    return (
        <button 
            className="sidebar"
            onClick={clickToShowPlaylist.bind(clickToShowPlaylist)}
        >
                <div className="icon" > {icon} </div>
                <div className="text-playlist" > {text} </div>
        </button>
    )
}

export default SideBarNavButton;