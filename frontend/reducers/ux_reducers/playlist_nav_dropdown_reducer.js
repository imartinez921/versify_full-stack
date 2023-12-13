import {
	PLAYLISTNAV_DROPDOWN_OPEN,
	PLAYLISTNAV_DROPDOWN_CLOSE,
} from "../../actions/ux_actions";

const playlistNavDropdownReducer = (
	playlistNavDropdownState = { isOpen: false },
	action
) => {
	Object.freeze(playlistNavDropdownState);
	switch (action.type) {
		case PLAYLISTNAV_DROPDOWN_OPEN:
			return { isOpen: true };
		case PLAYLISTNAV_DROPDOWN_CLOSE:
			return { isOpen: false };
		default:
			return playlistNavDropdownState;
	}
};

export default playlistNavDropdownReducer;
