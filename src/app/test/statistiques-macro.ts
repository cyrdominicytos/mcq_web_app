import { Component } from '@angular/core';
import { QcmService } from '../service/qcm.service';

@Component({
    moduleId: module.id,
    templateUrl: './statistiques-macro.html'
})
export class StatMacroComponent {

    qcm: any;

    constructor(
        private qcmService: QcmService
    ) {
    }

    search = '';
    cols = [
        { field: 'id', title: 'ID', isUnique: true, filter: false },
        { field: 'quiz', title: 'Quiz' },
        { field: 'module', title: 'Module' },
        { field: 'classe', title: 'Classe' },
        { field: 'status', title: 'Status' },
        { field: 'start', title: 'Publié le', type: 'date' },
        { field: 'end', title: 'Dernier délai', type: 'date' },
        { field: 'score', title: 'Note moyenne', type: 'number' },
        { field: 'actions', title: 'Action', filter: false, headerClass: 'justify-center' }
    ];
    rows = <any>[];

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

    ngOnInit() {
        this.qcmService
            .getAll()
            .subscribe((data: any) => {
                const newsRows = [];
                for (const qcm of data) {
                    newsRows.push({
                        id: qcm.id,
                        quiz: qcm.title,
                        module: qcm.level.fieldOfStudy,
                        status: 'Clôturé',
                        end: '2024-06-05', //TODO
                        classe: qcm.level.classOfStudy,
                        start: qcm.creationDate.split('T')[0],
                        score: 0
                    })
                }
                this.rows = newsRows;
            });
    }
}
