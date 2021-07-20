import { IPageRequest } from "../global/global.DTO";

export interface IPageProduct extends IPageRequest {
  category_id: any;
}

export interface IPageCategory extends IPageRequest {
  parish_id;
}