import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as url from 'url';

@Injectable({
  providedIn: 'root'
})
export class QcmService {

  constructor(
      private httpClient: HttpClient
  ) { }

    public getQcm(id: string|number): any{
      return this.httpClient.get(url+`/qcm/${id}`)
    }
}
