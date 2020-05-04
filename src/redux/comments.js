import { COMMENTS } from '../shared/comments';  // Comment this line if you have a valid Node API to fetch comments.
import * as ActionTypes from './ActionTypes';

export const Comments = (state = COMMENTS, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      var comment = action.payload;
      comment.id = state.length;
      comment.date = new Date().toISOString();
      console.log("Comment: ", comment);
      return state.concat(comment);

    default:
      return state;
  }
};

// The following actions are available if you have a valid Node API to do a request

// export const Comments = (state = { errMess: null, comments:[]}, action) => {
//   switch (action.type) {
//     case ActionTypes.ADD_COMMENTS:
//       return {...state, errMess: null, comments: action.payload};

//     case ActionTypes.COMMENTS_FAILED:
//       return {...state, errMess: action.payload};

//     case ActionTypes.ADD_COMMENT:
//         var comment = action.payload;
//         return { ...state, comments: state.comments.concat(comment)};

//     default:
//       return state;
//   }
// };