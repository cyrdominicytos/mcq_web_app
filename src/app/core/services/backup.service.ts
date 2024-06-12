import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { environment } from "../../../environments/environment";
import { Qcm, QcmToEdit } from '../models/qcm.model';
import { Backup } from '../models/backup.model';

@Injectable({
    providedIn: 'root'
})
export class BackupService {
    private baseUrl = environment.apiUrl + '/backups';

    constructor(private http: HttpClient) { }

    getTeacherBackup(teacherId: number): Observable<Backup> {
        return this.http.get<Backup>(this.baseUrl+"/"+teacherId);
    }

    saveBackup(teacherId: number, content: string): Observable<any> {
        const payload = {
            teacherId: teacherId,
            content: content
        };
        return this.http.post<any>(this.baseUrl, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

    }

    //will be removed
    formatObject(teacherId: number, content: string){
        const formData = new FormData();
        formData.append('teacherId', teacherId.toString());
        formData.append('content', content);
        return formData;
    }


}
