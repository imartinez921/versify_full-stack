import { combineReducers } from "redux";

import playlistNavDropdownReducer from "./ux_reducers/playlist_nav_dropdown_reducer";
import playlistEditModalReducer from "./ux_reducers/playlist_edit_modal_reducer";

const uxReducer = combineReducers({
	playlistNavDropdown: playlistNavDropdownReducer,
	playlistEditModal: playlistEditModalReducer,
});

export default uxReducer;
