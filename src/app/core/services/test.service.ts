import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
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

    createTestWithFile(
        file: File,
        levelId: number,
        teacherId: number,
        limitQuestion: number,
        delay: number,
        title: string,
        complexity: number,
        isRandomActive: boolean,
        isActive: boolean,
        openStartDate: string,
        closeStartDate: string
    ): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('levelId', levelId.toString());
        formData.append('teacherId', teacherId.toString());
        formData.append('limitQuestion', limitQuestion.toString());
        formData.append('delay', delay.toString());
        formData.append('title', title);
        formData.append('complexity', complexity.toString());
        formData.append('isRandomActive', isRandomActive.toString());
        formData.append('isActive', isActive.toString());
        formData.append('openStartDate', openStartDate);
        formData.append('closeStartDate', closeStartDate);

        const url = "/createQCMFromString"
        return this.http.post<any>(this.baseUrl+url, formData
            /*,{
            headers: new HttpHeaders({
                // If your API requires a specific content-type, otherwise let it auto-detect
                'Content-Type': 'multipart/form-data'
            })
        }*/

        );
    }

    /*getTestById(id: number): Observable<Model> {
        return this.http.get<Model>(`${this.baseUrl}/${id}`);
    }

    createTest(model: Model): Observable<Model> {
        return this.http.post<Model>(this.baseUrl, model);
    }*/

}
