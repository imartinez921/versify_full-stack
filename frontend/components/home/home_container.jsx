import { connect } from "react-redux"
import { clearCurrent } from "../../actions/playlist_actions";

import Home from "./home";

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch) => ({
    clearCurrent: () => dispatch(clearCurrent()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
