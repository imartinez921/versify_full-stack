import { connect } from "react-redux";
import { displayAlbum,
} from "../../actions/artist_actions";
import AlbumLink from "./album_link";

const mapDispatchtoProps = (dispatch) => ({
	displayAlbum: (albumId) => dispatch(displayAlbum(albumId)),
});

export default connect(null, mapDispatchtoProps)(AlbumLink);