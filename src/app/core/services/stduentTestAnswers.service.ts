import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { environment } from "../../../environments/environment";
import { Qcm, QcmToEdit } from '../models/qcm.model';
import { StudentTestAnswer } from '../models/studentTest.model';

@Injectable({
    providedIn: 'root'
})
export class StudentTestAnswersService {
    private baseUrl = environment.apiUrl + '/student_test_answer';

    constructor(private http: HttpClient) { }

    getAllStudentTestAnswers(): Observable<StudentTestAnswer[]> {
        return this.http.get<StudentTestAnswer[]>(this.baseUrl);
    }
    getStudentTestAnswers(stduentTestId:number): Observable<any> {
        const url = "/getAllByStudentTest/"+stduentTestId
        return this.http.get<any>(this.baseUrl+url);
    }
}
