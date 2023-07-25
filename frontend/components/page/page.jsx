import React, { useEffect } from "react";

import NavBarMainContainer from "../nav_bar/nav_bar_main_container";
import SidebarContainer from "../sidebar/sidebar_container";
import CurrentViewContainer from "./current_view_container";
import Footer from "../footer/footer";

const Page = ({
    history,
    params,
    path,
    currentUser,
    errors,
    clearPlaylistErrors,
}) => {
    return (
        <div className="page_container">
            <div className="page-body">
                <nav className="nav-container-main">
                    <NavBarMainContainer history={history} />
                </nav>
                <SidebarContainer
                    history={history}
                    path={path}
                    currentUser={currentUser}
                    errors={errors}
                />
                <div className="current-container">
                    <CurrentViewContainer
                        currentUser={currentUser}
                        params={params}
                        path={path}
                        history={history}
                    />
                </div>
            </div>
            <div className="footer-container">
                <Footer />
            </div>
        </div>
    );
};

export default Page;
