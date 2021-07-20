import { IPageRequest } from "../global";

export interface IPageCalendar extends IPageRequest {
    cal_date?: string | Date;
}
export interface Day {
    valueView: string;
    value: any;
}