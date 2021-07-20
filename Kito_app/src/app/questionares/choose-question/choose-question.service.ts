import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class QuestionDataService {
    messageSource = new BehaviorSubject<string>("");
    currentMessage = this.messageSource.asObservable();
    QuestionType = new BehaviorSubject<any>({});
    currentQuestionType = this.QuestionType.asObservable();
    // có thể subcribe theo dõi thay đổi value của biến này thay cho messageSource

    constructor() { }

    // method này để change source message 
    changeMessage(message) {
        this.messageSource.next(message);
    }
    setQuestionType(data) {
        this.QuestionType.next(data)
    }
}