import { IPageRequest } from "../global";

export interface IPageParishes extends IPageRequest{
  diocese_id?;
  parish_id?;
}