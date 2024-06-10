import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(
      private httpClient: HttpClient
  ) { }
    getQcmStats(id: number|string): Observable<any>{
      return this.httpClient
          .get(environment.apiUrl+"/qcm/statistics/"+id)
    }

}
