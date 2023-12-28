import React from "react";
import { withRouter } from "react-router-dom";

const AlbumLink = ({
    album,
    history,
}) => {
	const { id, name } = album;

	const currentView = {
		source: history.location.pathname.split("/")[1],
		id: parseInt(history.location.pathname.split("/")[2]),
	};

	const handleClick = (e) => {
		e.preventDefault();
		return history.push(`/album/${id}`);
	};

	if (currentView.source === "album" && currentView.id === id) {
		return <span>{name}</span>;
	} else {
		return (
			<a onClick={handleClick} className="artist-link">
				{name}
			</a>
		);
	}
}

export default withRouter(AlbumLink);