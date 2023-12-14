import {
	PLAYLISTEDIT_MODAL_OPEN,
	PLAYLISTEDIT_MODAL_CLOSE,
} from "../../actions/ux_actions";
import { RECEIVE_CURRENT_PLAYLIST } from "../../actions/playlist_actions";

const playlistEditModalReducer = (playlistEditModalState = {}, action) => {
	Object.freeze(playlistEditModalState);
	switch (action.type) {
		case PLAYLISTEDIT_MODAL_OPEN:
			return { isOpen: true };
		case PLAYLISTEDIT_MODAL_CLOSE:
			return { isOpen: false };
		case RECEIVE_CURRENT_PLAYLIST:
			return { isOpen: false };
		default:
			return playlistEditModalState;
	}
};

export default playlistEditModalReducer;
