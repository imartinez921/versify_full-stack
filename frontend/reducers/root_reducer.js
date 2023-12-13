import { combineReducers } from "redux";
import entitiesReducer from "./entities_reducer";
import uxReducer from "./ux_reducer";
import sessionReducer from "./session_reducer";
import errorsReducer from "./errors_reducer";

const rootReducer = combineReducers({
	entities: entitiesReducer,
	ux: uxReducer,
	session: sessionReducer,
	errors: errorsReducer,
});

export default rootReducer;
