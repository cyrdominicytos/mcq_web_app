import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { environment } from "../../../environments/environment";
import {Qcm} from "../models/qcm.model";

@Injectable({
    providedIn: 'root'
})
export class TestService {
    private baseUrl = environment.apiUrl + '/qcm';

    constructor(private http: HttpClient) { }

    getAllTests(): Observable<Qcm[]> {
        return this.http.get<Qcm[]>(this.baseUrl);
    }

    exportQcmAsJson(id: number): Observable<Blob> {
        const url = `${this.baseUrl}/${id}/export`;
        const headers = new HttpHeaders({
            'Accept': 'application/json'
        });

        return this.http.get(url, { headers: headers, responseType: 'blob' }).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
            // Client-side or network error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Backend error
            switch (error.status) {
                case 400:
                    errorMessage = `Failed to parse JSON: ${error.error}`;
                    break;
                case 404:
                    errorMessage = 'Resource not found!';
                    break;
                case 500:
                    errorMessage = 'Internal server error!';
                    break;
                default:
                    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
        }
        return throwError(errorMessage);
    }

    deleteQcm(id: number): Observable<void> {
        const url = `${this.baseUrl}/delete/${id}`;
        return this.http.delete<void>(url).pipe(
            catchError(this.handleError)
        );
    }

    createQcmViaJson(file: File, teacherId: number, levelId: number): Observable<any> {
        const url = `${this.baseUrl}/createQcmFromJson/${teacherId}/${levelId}`;
        const formData: FormData = new FormData();
        formData.append('file', file);

        return this.http.post(url, formData).pipe(
            catchError(this.handleError)
        );
    }

    /*getTestById(id: number): Observable<Model> {
        return this.http.get<Model>(`${this.baseUrl}/${id}`);
    }

    createTest(model: Model): Observable<Model> {
        return this.http.post<Model>(this.baseUrl, model);
    }*/

}
