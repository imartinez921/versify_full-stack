import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";

import PlaylistIndexContainer from "../playlists/playlist_index_container";
import SidebarNavButton from "./sidebar_nav_button";

const Sidebar = (props) => {
    const {
        createPlaylist,
        fetchPlaylists,
        playlists,
        history,
        currentUser,
        errors,
    } = props;

    // const playlistIndexRender = useMemo( () => <PlaylistIndexContainer
    //     currentUser={currentUser} history={history}
    //     />, [playlists]
    // )

    // const handleDropdown = useMemo( () => <playlistNavDropdown

    const handleSubmitCreate = (e) => {
        e.preventDefault();

        const number = playlists.length + 1;

        const defaultNewPlaylist = {
            title: `Untitled Playlist #${number}`,
            description: "Please add a description",
            user_id: currentUser.id,
        };

        return createPlaylist(defaultNewPlaylist)
            .then(() => fetchPlaylists(currentUser.id))
            .then((actionObj) =>
                history.push(`/playlist/${actionObj.playlists[0].id}`)
            );
    };

    return (
        <section className="sidebar-container">
            <nav className="sidebar">
                <SidebarNavButton
                    history={history}
                    text="Home"
                    icon={<AiFillHome />}
                    url="home"
                />
                {/* <SidebarNavButton history={history} text='Search' icon={<FaSearch />} url='search' /> */}
                <button
                    className="sidebar-nav"
                    name="playlist"
                    onClick={handleSubmitCreate}
                >
                    <div className="icon">
                        <MdOutlineAddBox />
                    </div>
                    <div className="text-button">Create Playlist</div>
                </button>
            </nav>

            <div className="line"></div>
            <PlaylistIndexContainer currentUser={currentUser} 
                history={history}/>
        </section>
    );
};

export default withRouter(Sidebar);
