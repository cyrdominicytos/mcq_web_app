import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { environment } from "../../../environments/environment";
import { Qcm, QcmToEdit } from '../models/qcm.model';
import { StudentTest, StudentTestAnswer } from '../models/studentTest.model';

@Injectable({
    providedIn: 'root'
})
export class StudentTestService {
    private baseUrl = environment.apiUrl + '/student_test';

    constructor(private http: HttpClient) { }

    getAllStudentTests(): Observable<StudentTest[]> {
        return this.http.get<StudentTest[]>(this.baseUrl);
    }
    getStudentTestByStudentId(stduentId:number): Observable<any> {
        const url = "/getByStudentId/"+stduentId
        return this.http.get<any>(this.baseUrl+url);
    }
}
