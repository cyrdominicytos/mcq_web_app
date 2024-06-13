import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from "../../../environments/environment";
import {AnswerQcm} from "../models/answerQcm.model";
import {Score} from "../models/score.model";

@Injectable({
    providedIn: 'root'
})
export class AnswerService {
    private baseUrl = environment.apiUrl + '/answer';

    constructor(private http: HttpClient) { }

    answerQcm(idQcm: number, answerQcm: AnswerQcm): Observable<Score> {
        const url = `${this.baseUrl}/qcm/${idQcm}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post<Score>(url, answerQcm, { headers });
    }

}
