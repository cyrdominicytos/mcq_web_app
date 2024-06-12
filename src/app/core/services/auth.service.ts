// student-status.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthStatusService {
    private _isStudent: boolean;

    constructor() {
        this._isStudent = JSON.parse(localStorage.getItem('isStudent') || 'true'); // Valeur par défaut : true
    }

    get isStudent(): boolean {
        return this._isStudent;
    }

    set isStudent(value: boolean) {
        this._isStudent = value;
        localStorage.setItem('isStudent', JSON.stringify(value));
    }
}
