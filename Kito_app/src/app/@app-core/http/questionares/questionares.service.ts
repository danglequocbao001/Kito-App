import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { APICONFIG } from '../@http-config/api';

@Injectable({
    providedIn: 'root'
})

export class QuestionaresService {
    constructor(private http: HttpClient) { }

    public getTopic() {
        return this.http.get<any>(`${APICONFIG.QUESTIONARES.GET_TOPIC}`).pipe(
            map((result) => {
                return result;
            }),
            catchError((errorRes: any) => {
                throw errorRes.error;
            })
        );
    }

    public getLevel() {
        return this.http.get<any>(`${APICONFIG.QUESTIONARES.GET_LEVEL}`).pipe(
            map((result) => {
                return result;
            }),
            catchError((errorRes: any) => {
                throw errorRes.error;
            })
        );
    }

    public getQuesTopic(topic: any) {
        return this.http.get<any>(`${APICONFIG.QUESTIONARES.GET_QUES_TOPIC(topic)}`).pipe(
            map((result) => {
                return result;
            }),
            catchError((errorRes: any) => {
                throw errorRes.error;
            })
        );
    }

    public getQuesLevel(level: any) {
        return this.http.get<any>(`${APICONFIG.QUESTIONARES.GET_QUES_LEVEL(level)}`).pipe(
            map((result) => {
                return result;
            }),
            catchError((errorRes: any) => {
                throw errorRes.error;
            })
        );
    }

    public checkAnswer(answerKey: string) {
        return this.http.get(`${APICONFIG.QUESTIONARES.CHECK_ANSWER(answerKey)}`).pipe(
            map((result: any) => {
                return result;
            }),
            catchError((errorRes) => {
                throw errorRes.error;
            })
        );
    }

    public updateScore(score: any) {
        return this.http.put(`${APICONFIG.QUESTIONARES.UPDATE_SCORE}`, score).pipe(
            map((result: any) => {
                return result;
            }),
            catchError((errorRes) => {
                throw errorRes.error;
            })
        )
    }

    public getRanking() {
        return this.http.get<any>(`${APICONFIG.QUESTIONARES.RANKING}`).pipe(
            map((result) => {
                return result;
            }),
            catchError((errorRes: any) => {
                throw errorRes.error;
            })
        );
    }
}