import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

import { AuthRoute } from '../util/route_util';
import { LoggedoutRoute } from '../util/session_route_util';
import SplashContainer from './splash/splash_container';
import SignupFormContainer from './session/signup_form_container'
import LoginFormContainer from './session/login_form_container'
import HomeContainer from './home/home_container';
// import EditPlaylistContainer from './playlists/edit_playlist_container'


const App = () => (
    <div>
      <Switch>
        <Route exact path="/" component={SplashContainer} />
        <LoggedoutRoute exact path="/signup" component={SignupFormContainer} />
        <LoggedoutRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path='/home' component={HomeContainer} />
        {/* <AuthRoute exact path='/edit' component={EditPlaylistContainer} /> */}
      </Switch>
          
    </div>
)

export default App;
