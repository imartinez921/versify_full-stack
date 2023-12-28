import {connect} from 'react-redux';
import Sidebar from './sidebar';
import { fetchPlaylists,
    createPlaylist,
} from '../../actions/playlist_actions';


const mapStateToProps = (state, ownProps) => ({
    playlists: state.entities.playlists,
    currentUser: ownProps.currentUser,     // pass this through as props to keep on refresh
})

const mapDispatchToProps = (dispatch) => ({
    fetchPlaylists: () => dispatch( fetchPlaylists() ),
    createPlaylist: (defaultPlaylist) => dispatch( createPlaylist(defaultPlaylist) ),
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)

