import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QcmService {

  constructor(
      private httpClient: HttpClient
  ) { }

    public getQcm(id: string|number): any{
      return this.httpClient.get(environment.apiUrl+`/qcm/${id}`)
    }
    public getAll(): Observable<any>{
        return this.httpClient.get(environment.apiUrl+`/qcm`)
    }
}
