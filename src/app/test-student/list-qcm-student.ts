import { Component } from '@angular/core';
import {Qcm} from "../core/models/qcm.model";
import {TestService} from "../core/services/test.service";
import { Router } from '@angular/router';
import { AuthStatusService } from '../core/services/auth.service';

@Component({
    moduleId: module.id,
    templateUrl: './list-qcm-student.html',
})
export class ListQcmStudentComponent {
    constructor(private testService: TestService, private router: Router, private  authService: AuthStatusService) {
        if(!this.authService.isStudent){
            this.router.navigate(['/list-qcm-teacher']);
        }
    }

    cols = [
        { field: 'id', title: 'ID', isUnique: true, filter: false },
        { field: 'title', title: 'Quiz' },
        { field: 'module', title: 'Module' },
        { field: 'totalQuestions', title: '# Questions', filter: false  },
        { field: 'status', title: 'Status' , filter: false},
        { field: 'openStartDate', title: 'Lancé le', type: 'date' },
        { field: 'closeStartDate', title: 'Date déchéance', type: 'date' },
        { field: 'actions', title: 'Action', filter: false, headerClass: 'justify-center' },
    ];

    listOfQcm: Qcm[] = [];

    //TODO implement from constants
    studentId: number = 1;

    ngOnInit() {
        this.loadQCMs();
    }

    loadQCMs() {
        console.log('Calling loadQCMs()...');
        this.testService.getAllQcmByStudentId(this.studentId).subscribe(
            (qcms) => {
                this.listOfQcm = qcms;
                console.log(this.listOfQcm);
            },
            (error) => {
                console.error('Error while loading Qcm:', error);
            }
        );
    }

    getTotalQuestions(qcm: Qcm): number {
        return qcm.questions.length;
    }

    getStatus(qcm: Qcm): string {
        if (!qcm.active) {
            return 'Inactive';
        }

        const now = new Date();
        const openStartDate = new Date(qcm.openStartDate);
        const closeStartDate = new Date(qcm.closeStartDate);

        if(!closeStartDate){
            if (now >= openStartDate && now <= closeStartDate) {
                return 'À faire';
            } else {
                return 'Clôturé';
            }
        }else{
            if (now >= openStartDate) {
                return 'À faire';
            } else {
                return 'Clôturé';
            }
        }
    }

    formatDate(date: any) {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    }
    formatScore(score: number): string {
        return score.toFixed(2);  // Formater le score avec 2 chiffres après la virgule
    }

    takeTest(qcmId: number) {
        console.log("Sending id ", qcmId);
        this.router.navigate(['/take-test'], { state: { id: qcmId } });
    }
}
