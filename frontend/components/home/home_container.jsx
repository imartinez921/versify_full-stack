import { connect } from "react-redux";

import Home from "./home";

const mapStateToProps = (state, ownProps) => ({
    params: ownProps.params,
    history: ownProps.history,
})

const mapDispatchToProps = (dispatch) => ({
})
export default connect(mapStateToProps, null)(Home);