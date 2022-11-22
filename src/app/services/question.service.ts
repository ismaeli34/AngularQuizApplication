import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }


  public getQuestionOfQuiz(qid:any){
    return this.http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  //add question 

  public addQuestion(question:any){
    return this.http.post(`${baseUrl}/question/`,question);
  }

  public deleteQuestion(qid:any){
    return this.http.delete(`${baseUrl}/question/${qid}`);
  }

  public getQuestion(qId:any){
    return this.http.get(`${baseUrl}/question/quiz/${qId}`)
  }


  public getQuestionForTest  (qid:any){
    return this.http.get(`${baseUrl}/question/quiz/${qid}`);
  }


public updateQuestion(question:any){
    return this.http.put(`${baseUrl}/question/`,question);
  }


  //eval quiz
  public evalQuiz(questions:any){
    return this.http.post(`${baseUrl}/question/eval-quiz`,questions);
  }
}
