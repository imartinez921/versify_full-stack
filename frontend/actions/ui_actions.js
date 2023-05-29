
// Declare action type constants
export const PLAYLISTNAV_DROPDOWN_OPEN = 'PLAYLISTNAV_DROPDOWN_OPEN'
export const PLAYLISTNAV_DROPDOWN_CLOSE = 'PLAYLISTNAV_DROPDOWN_CLOSE'
export const PLAYLISTEDIT_MODAL_OPEN = 'PLAYLISTEDIT_MODAL_OPEN'
export const PLAYLISTEDIT_MODAL_CLOSE = 'PLAYLISTEDIT_MODAL_CLOSE'
export const TRACKCARD_DROPDOWN_OPEN = 'TRACKCARD_DROPDOWN_OPEN'
export const TRACKCARD_DROPDOWN_CLOSE = 'TRACKCARD_DROPDOWN_CLOSE'


// Declare actions that will be read by the reducer
const playlistNavDropdownOpen = () => ({
    type: PLAYLISTNAV_DROPDOWN_OPEN,
})

const playlistNavDropdownClose = () => ({
    type: PLAYLISTNAV_DROPDOWN_CLOSE,
})

const playlistEditModalOpen = () => ({
    type: PLAYLISTEDIT_MODAL_OPEN
})

const playlistEditModalClose = () => ({
    type: PLAYLISTEDIT_MODAL_CLOSE
})

const trackCardDropdownOpen = () => ({
    type: TRACKCARD_DROPDOWN_OPEN
})

const trackCardDropdownClose = () => ({
    type: TRACKCARD_DROPDOWN_CLOSE
})


// Declare Thunk action creators linked to dispatch
export const openPlaylistNavDropdown = () => dispatch => (
    dispatch(playlistNavDropdownOpen())
);
export const closePlaylistNavDropdown = () => dispatch => (
    dispatch(playlistNavDropdownClose())
);

export const openPlaylistEditModal = () => dispatch => (
    dispatch(playlistEditModalOpen())
);
export const closePlaylistEditModal = () => dispatch => (
    dispatch(playlistEditModalClose())
);

export const openTrackCardDropdown = () => dispatch => (
    dispatch(trackCardDropdownOpen())
);

export const closeTrackCardDropdown = () => dispatch => (
    dispatch(trackCardDropdownClose())
);
