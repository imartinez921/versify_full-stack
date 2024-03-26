import React from "react";

const SidebarNavButton = (props) => {
    // eg. Home button, Search button
    const { text, icon, url, history } = props;

    const clickToNavigate = (e) => {
        e.preventDefault();
        history.push(`/${url}`);
    };

    return (
        <button className="sidebar-nav" onClick={clickToNavigate}>
            <div className="icon"> {icon} </div>
            <div className="text-playlist"> {text} </div>
        </button>
    );
};

export default SidebarNavButton;
