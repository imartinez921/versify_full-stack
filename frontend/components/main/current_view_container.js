import { connect } from "react-redux";
import { displayPlaylist,
    editPlaylist,
    destroyPlaylist,
} from "../../actions/playlist_actions";

import CurrentView from "./current_view";

const mapStateToProps = (state, ownProps) => {
    return ({
        currentUser: ownProps.currentUser,
        params: ownProps.params, // matchObj = {params, path, url} as keys
        path: ownProps.path,
        history: ownProps.history,
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        displayPlaylist: () => dispatch(displayPlaylist()),
        editPlaylist: () => dispatch(editPlaylist()),
        destroyPlaylist: () => dispatch(destroyPlaylist()),
    })
}

export default connect (mapStateToProps, mapDispatchToProps)(CurrentView);