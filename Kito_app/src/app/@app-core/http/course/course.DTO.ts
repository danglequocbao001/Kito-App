import { IPageRequest } from "../global";

export interface IPageCourse extends IPageRequest {
    course_group_id?:string;
}