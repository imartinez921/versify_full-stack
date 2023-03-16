import {PLAYLIST_MODAL_OPEN,
    PLAYLIST_MODAL_CLOSE,
} from '../../actions/ui_actions'

const playlistModalReducer = (playlistModalState = {}, action) => {
    Object.freeze(playlistModalState);
    switch (action.type) {
        case PLAYLIST_MODAL_OPEN:
            return {isOpen: true};
        case PLAYLIST_MODAL_CLOSE:
            return {isOpen: false};
        default:
            return playlistModalState;
    }
}

export default playlistModalReducer;