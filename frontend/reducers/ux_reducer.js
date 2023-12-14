import { combineReducers } from "redux";

import playlistNavDropdownReducer from "./ux_reducers/playlist_nav_dropdown_reducer";
import playlistEditModalReducer from "./ux_reducers/playlist_edit_modal_reducer";
import albumNavDropdownReducer from "./ux_reducers/album_nav_dropdown_reducer";

const uxReducer = combineReducers({
	playlistNavDropdown: playlistNavDropdownReducer,
	playlistEditModal: playlistEditModalReducer,
	albumNavDropdown: albumNavDropdownReducer,
});

export default uxReducer;
