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

export function helloUserReducer(state : string = '', action: NameAction) {
  var newState = state;
  switch (action.type) {
    case 'NAME_MODIFIED':
      newState = action.value;
      break;
    case 'NAME_LEFT':
      newState = '';
      break;
    default:
  }
  return newState;
}


export function goodbyeUserReducer(state : string = '', action: NameAction) {
  var newState =  state;
  switch (action.type) {
    case 'NAME_LEFT':
      newState = action.value;
      break;
    default:
  }
  return newState
}
