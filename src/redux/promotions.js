import { PROMOTIONS } from '../shared/promotions';  // Comment this line if you have a valid Node API to fetch comments.
// import * as ActionTypes from './ActionTypes';   // Uncomment this line if you have a valid Node API to fetch comments.

export const Promotions = (state = PROMOTIONS, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// The following actions are available if you have a valid Node API to do a request

// export const Promotions = (state  = { isLoading: true, errMess: null, promotions:[]}, action) => {
//   switch (action.type) {
//     case ActionTypes.ADD_PROMOS:
//       return {...state, isLoading: false, errMess: null, promotions: action.payload};

//     case ActionTypes.PROMOS_LOADING:
//       return {...state, isLoading: true, errMess: null, promotions: []}

//     case ActionTypes.PROMOS_FAILED:
//       return {...state, isLoading: false, errMess: action.payload};

//     default:
//       return state;
//   }
// };