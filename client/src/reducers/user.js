import { LOG_IN, LOG_OUT, GET_USER_INFO, CHANGE_CHANNEL } from '../actions/actionTypes';

const initialState = {
  username: 'anon',
  region: 'Market St',
  channel: 'General'
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      console.log('LOGGING IN');
      return { ...state, username: action.username };
    case LOG_OUT:
      // set to initial state but keep current region
      return { ...initialState, region: state.region };
    case CHANGE_CHANNEL:
      return { ...state, channel: action.channel };
    default:
      return state;
  }
};

export default user;
