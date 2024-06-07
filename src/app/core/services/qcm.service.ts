import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import { environment } from "../../../environments/environment";
import {Qcm} from "../models/qcm.model";

@Injectable({
    providedIn: 'root'
})
export class QcmService {
    private baseUrl = environment.apiUrl + '/qcm';

    constructor(private http: HttpClient) { }

    getAllTests(): Observable<Qcm[]> {
        return this.http.get<Qcm[]>(this.baseUrl);
    }

    /*createTest(model: Model): Observable<Qcm> {
        return this.http.post<Model>(this.baseUrl, model);
    }*/



    createTestFromText(data:any) {
        //return this.http.post<>(this.baseUrl, data);
        /*if (this.file && this.formCreateTest.valid) {
            const formValues = this.formCreateTest.value;
            this.fileService.uploadFile(
                this.file,
                this.apiUrl,
                formValues.levelId,
                formValues.teacherId,
                formValues.limitQuestion,
                formValues.delay,
                formValues.title,
                formValues.complexity,
                formValues.isRandomActive,
                formValues.isActive,
                formValues.openStartDate,
                formValues.closeStartDate
            ).subscribe(response => {
                console.log('File uploaded successfully', response);
            }, error => {
                console.error('File upload failed', error);
            });
        } else {
            console.error('No file to upload or form is invalid');
        }*/
    }

    /*getTestById(id: number): Observable<Model> {
        return this.http.get<Model>(`${this.baseUrl}/${id}`);
    }

    createTest(model: Model): Observable<Model> {
        return this.http.post<Model>(this.baseUrl, model);
    }
    */

}
