import { IPageRequest } from "../global";

export interface IPageEvent extends IPageRequest {
  calendar_id?: string;
  parish_id?: string;
}