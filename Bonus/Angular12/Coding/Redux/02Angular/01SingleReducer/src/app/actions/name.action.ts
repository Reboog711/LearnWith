import {Action} from "@ngrx/store";

export const NAME_MODIFIED = "NAME_MODIFIED";
export const NAME_LEFT = "NAME_LEFT";

export class NameAction implements Action {
  type: string;
  value: string;
}
