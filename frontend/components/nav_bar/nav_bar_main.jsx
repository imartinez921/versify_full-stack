import React from "react";
import { withRouter } from "react-router-dom";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import SearchBar from "./searchbar";
import Logo from "../logo";

class NavBarMain extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentUser: this.props.currentUser, // denotes Logged Out status
			menuOpen: false,
		};

		this.showMenu = this.showMenu.bind(this);
	}

	showMenu(e) {
		e.preventDefault();
		this.setState({ menuOpen: !this.state.menuOpen });
	}

	render() {
		const { currentUser, loggedOut, logout, history } = this.props;
		const { menuOpen } = this.state;

		const logoutClick = () => logout().then(() => history.push("/"));

		const dropMenu = (
			<div className="dropdown-item menu-main">
				<a href="https://github.com/imartinez921">GitHub</a>
				<a href="https://www.linkedin.com/in/irenemartinez921/">
					LinkedIn
				</a>
				<a onClick={logoutClick}>Log out</a>
			</div>
		);

		const arrowDisplay = menuOpen ? (
			<MdKeyboardArrowUp />
		) : (
			<MdKeyboardArrowDown />
		);

		return (
			<nav className="nav-container-main">
				<div className="site-logo-main">
					<Logo history={history} />
				</div>

				<div className="search-container">
					{history.location.pathname !== "/" ? (
						<SearchBar history={history} />
					) : null}
				</div>

				<nav className="nav-display" id="splash-logged-in">
					<div id="avatar-pic-nav-main" onClick={this.showMenu}>
						<div id="avatar-pic">{currentUser.username}</div>
						<div id="arrow-display">{arrowDisplay} </div>
					</div>

					{this.state.menuOpen ? dropMenu : null}
				</nav>
			</nav>
		);
	}
}

export default withRouter(NavBarMain);
