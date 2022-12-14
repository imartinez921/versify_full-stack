import { combineReducers } from 'redux';

import usersReducer from './users_reducer';
import playlistsReducer from './playlists_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    playlists: playlistsReducer,
})


export default entitiesReducer;