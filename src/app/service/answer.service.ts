import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

    url = environment.apiUrl;
  constructor(
      private httpClient: HttpClient
  ) { }


    delete(id: number){
      return this.httpClient.delete(this.url + `/answer/delete/${id}`)
    }
}
