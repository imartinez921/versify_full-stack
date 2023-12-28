import { connect } from "react-redux";
import ArtistIndex from "./artist_index";
import { fetchArtists, displayArtist } from "../../actions/artist_actions";

const mapStateToProps = ({ entities: { artists } }, ownProps) => ({
	artists: Object.values(artists),
});

const mapDispatchToProps = (dispatch) => ({
	fetchArtists: () => dispatch(fetchArtists()),
	displayArtist: (artistId) => dispatch(displayArtist(artistId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistIndex);
