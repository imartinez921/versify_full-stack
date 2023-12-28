import React from "react";
import { withRouter } from "react-router-dom";

const ArtistLink = ({
    artist,
    history,
}) => {

    const { id,
        name,
    } = artist;

    const currentView = {
		source: history.location.pathname.split("/")[1],
		id: parseInt(history.location.pathname.split("/")[2]),
	};

    const handleClick = (e) => {
        e.preventDefault();
        return history.push(`/artist/${id}`);
    }

    if (currentView.source === "artist" && currentView.id === id) {
        return <span>{name}</span>;
    } else {
        return (
            <a onClick={handleClick} className="artist-link">
                {name}
            </a>
        );
    }
}

export default withRouter(ArtistLink);