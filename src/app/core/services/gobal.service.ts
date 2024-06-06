import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import { environment } from "../../../environments/environment";
import {Qcm} from "../models/qcm.model";

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    /**
     * Generate fibonacci sequence for MCQ Complexity
     * @param limit
     */
    generateFibonacciSequence(limit: number): number[] {
        const fibonacciSequence: number[] = [0, 1];
        while (true) {
            const nextValue = fibonacciSequence[fibonacciSequence.length - 1] + fibonacciSequence[fibonacciSequence.length - 2];
            if (nextValue > limit) {
                break;
            }
            fibonacciSequence.push(nextValue);
        }
        return fibonacciSequence;
    }


}
