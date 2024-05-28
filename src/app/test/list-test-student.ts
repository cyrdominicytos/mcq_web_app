import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './list-test-student.html',
})
export class ListTestStudComponent {
    constructor() {}
    search = '';
    cols = [
        { field: 'id', title: 'ID', isUnique: true, filter: false },
        { field: 'quiz', title: 'Quiz' },
        { field: 'module', title: 'Module' },
        { field: 'status', title: 'Status'},
        { field: 'end', title: 'Dernier délai', type: 'date' },
        { field: 'start', title: 'Réalisé le', type: 'date' },
        { field: 'score', title: 'Note', type: 'number'},
        { field: 'actions', title: 'Action', filter: false, headerClass: 'justify-center' },
    ];
    rows = [
        {
            id: 1,
            quiz: 'Bases des structures de données.',
            module: 'Intro aux structures des données',
            status: 'Clôturé',
            end: '2024-06-05',
            start : '',
            score:0
        },
        {
            id: 2,
            quiz: 'Analyse des algorithmes',
            module: 'Algorithmes et complexité',
            status: 'A faire',
            end: '2024-06-07',
            score:0
        },
        {
            id: 3,
            quiz: 'Fondements de la conception de bases de données',
            module: 'Introduction aux technologies web',
            status: 'Fait',
            end: '2024-07-07',
            start: '2024-05-05',
            score:11.2
        },
        {
            id: 4,
            quiz: 'Concepts des systèmes dexplotation',
            module: 'Systèmes dexplotation',
            status: 'Fait',
            end: '2024-07-07',
            start: '2024-05-05',
            score:5.5
        },
        {
            id: 5,
            quiz: 'Bases des structures de données',
            module: 'Intro aux structures des données',
            status: 'A faire',
            end: '2024-06-05',
            score:0
        },
        {
            id: 6,
            quiz: 'Analyse des algorithmes',
            module: 'Algorithmes et complexité',
            status: 'A faire',
            end: '2024-06-07'
        },
        {
            id: 7,
            quiz: 'Fondements de la conception de bases de données',
            module: 'Introduction aux technologies web',
            status: 'A faire',
            end: '2024-07-07',
            start: '',
            score:0
        },
        {
            id: 8,
            quiz: 'Concepts des systèmes dexplotation',
            module: 'Systèmes dexplotation',
            status: 'A faire',
            start: '',
            end: '2024-05-05',
            score:0
        },
        {
            id: 9,
            quiz: 'Bases des structures de données',
            module: 'Intro aux structures des données',
            status: 'Clôturé',
            end: '2024-06-05',
            start: '',
            score:0
        },
        {
            id: 10,
            quiz: 'Analyse des algorithmes',
            module: 'Algorithmes et complexité',
            status: 'Fait',
            end: '2024-06-07',
            start: '2024-06-02',
            score:17
        }
    ];

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
}
