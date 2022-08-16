// create slice of State for session errors
import {
    RECEIVE_SESSION_ERRORS,
    RECEIVE_CURRENT_USER, 
} from '../actions/session_actions'
  
const sessionErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors; // this is an array
        case RECEIVE_CURRENT_USER:
            return [];
        default:
            return state;
    }
  };
  
  export default sessionErrorsReducer;
  