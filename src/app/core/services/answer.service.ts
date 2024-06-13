import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { environment } from "../../../environments/environment";
import { Qcm, QcmToEdit } from '../models/qcm.model';
import {AnswerQcm} from "../models/answerQcm.model";

@Injectable({
    providedIn: 'root'
})
export class AnswerService {
    private baseUrl = environment.apiUrl + '/answer';

    constructor(private http: HttpClient) { }

    answerQcm(idQcm: number, answerQcm: AnswerQcm): Observable<Qcm> {
        const url = `${this.baseUrl}/qcm/${idQcm}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post<Qcm>(url, answerQcm, { headers });
    }

}
