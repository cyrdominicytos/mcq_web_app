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

    /*getTestById(id: number): Observable<Model> {
        return this.http.get<Model>(`${this.baseUrl}/${id}`);
    }

    createTest(model: Model): Observable<Model> {
        return this.http.post<Model>(this.baseUrl, model);
    }*/

}
