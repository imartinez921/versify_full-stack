import { combineReducers } from "redux";

import playlistDropdownReducer from "./ui_reducers/playlist_dropdown_reducer";
import playlistEditModalReducer from "./ui_reducers/playlist_edit_modal_reducer";

const uiReducer = combineReducers({
    playlistNavDropdown: playlistDropdownReducer,
    playlistEditModal: playlistEditModalReducer,
})

export default uiReducer;

