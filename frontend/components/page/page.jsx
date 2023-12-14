import React, { useEffect } from "react";

import NavBarMainContainer from "../nav_bar/nav_bar_main_container";
import SidebarContainer from "../sidebar/sidebar_container";
import CurrentViewContainer from "./current_view_container";
import PlayerContainer from "../player/player_container";

const Page = ({
	history,
	params,
	path,
	currentUser,
	errors,
	clearPlaylistErrors,
}) => {
	return (
		<div className="page-container">
			<NavBarMainContainer history={history} />
			<div className="page-body">
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
			<PlayerContainer
				params={params}
				path={path}
				history={history}
			/>
		</div>
	);
};

export default Page;
