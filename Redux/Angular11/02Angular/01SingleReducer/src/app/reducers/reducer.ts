import {NAME_LEFT, NAME_MODIFIED, NameAction} from "../actions/name.action";
import {createFeatureSelector, createSelector, State} from "@ngrx/store";

export interface helloGoodByeState{
  helloUser : string,
  goodbyeUser : string
}
const initialState : helloGoodByeState = {
  helloUser : '',
  goodbyeUser : ''
}

export function reducer(state : helloGoodByeState = initialState, action: NameAction) {
  var newState = Object.assign({}, state)

  switch (action.type) {
    case NAME_MODIFIED:
      newState.helloUser = action.value
      break;
    case NAME_LEFT:
      newState.goodbyeUser = action.value;
      newState.helloUser = '';
      break;
    default:
    // do nothing
  }
  return newState;
}
