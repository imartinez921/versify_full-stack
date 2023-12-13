import {
	ALBUMNAV_DROPDOWN_OPEN,
	ALBUMNAV_DROPDOWN_CLOSE,
} from "../../actions/ux_actions";

const albumNavDropdownReducer = (albumNavDropdownState = {}, action) => {
	Object.freeze(albumNavDropdownState); // albumNavDropdownState is a key-value pair
	switch (action.type) {
		case ALBUMNAV_DROPDOWN_OPEN:
			return { isOpen: true };
		case ALBUMNAV_DROPDOWN_CLOSE:
			return { isOpen: false };
		default:
			return albumNavDropdownState;
	}
};

export default albumNavDropdownReducer;
