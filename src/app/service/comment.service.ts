import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
    url = "";
  constructor(
      private httpClient: HttpClient
  ) {
      this.url = environment.apiUrl;
  }

    validAnswerComment(comment: any){
        return this.httpClient.put(this.url+`/comments/answers/update/${comment.id}`, {
            ...comment,
            valid: true,
        })
    }

    validQuestionComment(comment: any){
      return this.httpClient.put(this.url+`/comments/questions/update/${comment.id}`, {
          ...comment,
          valid: true,
      })
    }

    deleteAnswerComment(id: number){
        return this.httpClient.delete(this.url + `/comments/answers/delete/${id}`)
    }

    deleteQuestionComment(id: number){
        return this.httpClient.delete(this.url + `/comments/questions/delete/${id}`)
    }
}
