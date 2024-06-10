import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { environment } from "../../../environments/environment";
import {Qcm} from "../models/qcm.model";
import { Level } from '../models/level.model';

@Injectable({
    providedIn: 'root'
})
export class LevelService {
    private baseUrl = environment.apiUrl + '/levels';
    private _levels = new BehaviorSubject<Level[]>([]);
    readonly levels = this._levels.asObservable();
    constructor(private http: HttpClient) { }

    /*getAllLevels(): Observable<Level[]> {
        return this.http.get<Level[]>(this.baseUrl);
    }*/

    getAllLevels(): void {
        this.http.get(this.baseUrl)
            .subscribe(response => {
                this._levels.next(response as Level[]);
                console.log("levels", this.levels)
            }, error => {
                console.error('Failed to fetch levels', error);
            });
    }

    getLevelsObservable(): Observable<Level[]> {
        return this.levels;
    }

    /*getTestById(id: number): Observable<Model> {
        return this.http.get<Model>(`${this.baseUrl}/${id}`);
    }

    createTest(model: Model): Observable<Model> {
        return this.http.post<Model>(this.baseUrl, model);
    }*/

}
