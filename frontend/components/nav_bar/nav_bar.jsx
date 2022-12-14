import React from 'react';
import {MdKeyboardArrowDown,
    MdKeyboardArrowUp,
} from 'react-icons/md';
import Logo from '../logo';

import MyLinks from './my_links';
import SearchBar from './searchbar';

class NavBar extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            currentUser: this.props.currentUser, // denotes Logged Out status
            menuOpen: false,
        }

        this.showMenu = this.showMenu.bind(this)
    }

    showMenu (e) {
        e.preventDefault();
        this.setState({ menuOpen: !this.state.menuOpen });
    }
    
    render () {
        const { currentUser,
            loggedOut, 
            logout,
            history,
        } = this.props;
        const { menuOpen,
        } = this.state;

        const navLinks = (<nav 
            className="nav-links">
                {history.location.pathname === '/' 
                ? <MyLinks /> 
                : null}
            </nav>
        )

        // const logoDiv = (<div 
        //     className="site-logo">
        //     {history.location.pathname === '/' 
        //         ? 
        //         <>
        //             <GiRingedPlanet /> 
        //             <h2> Versify</h2>
        //         </>
        //         : null
        //     }    
        //     </div>
        // )

        const logoutClick = () => logout().then ( () => history.push('/'));

        const dropMenu = (<div 
            className="menu-item">
                {history.location.pathname !== '/' 
                    ?  <>
                        <a href='https://github.com/imartinez921'>GitHub</a>
                        <a href='https://www.linkedin.com/in/irenemartinez921/'>LinkedIn</a>
                        </>
                        : null}
                <a onClick={logoutClick}>Log out</a>
            </div>
        )
        
        const arrowDisplay = menuOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />

        const loggedIn = (
            <nav className='nav-display' id='splash-logged-in'>
                <div id='avatar-pic-nav' onClick={this.showMenu}> 
                    <div id="avatar-pic"></div>
                    <div id="arrow-display">{arrowDisplay} </div>
                </div>
                {this.state.menuOpen ? (dropMenu) : (null)
                }
            </nav>
        )

        const navDisplay = currentUser ? loggedIn : loggedOut;
        
        return (
            <nav className="nav-container">
                <Logo history={history}/>
                <div className='search-container'>
                    {history.location.pathname !== '/' 
                    ? <SearchBar history={history} />
                    : null}
                </div>
                {navLinks}
                {navDisplay}
            </nav>
        )
    }
}

export default NavBar;