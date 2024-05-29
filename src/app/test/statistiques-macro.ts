import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './statistiques-macro.html',
})
export class StatMacroComponent {
    constructor() {}
    search = '';
    cols = [
        { field: 'id', title: 'ID', isUnique: true, filter: false },
        { field: 'quiz', title: 'Quiz' },
        { field: 'module', title: 'Module' },
        { field: 'classe', title: 'Classe' },
        { field: 'status', title: 'Status' },
        { field: 'start', title: 'Publié le', type: 'date' },
        { field: 'end', title: 'Dernier délai', type: 'date' },
        { field: 'score', title: 'Note moyenne', type: 'number'},
        { field: 'actions', title: 'Action', filter: false, headerClass: 'justify-center' },
    ];
    rows = [
        {
            id: 1,
            quiz: 'Bases des structures de données.',
            module: 'Intro aux structures des données',
            status: 'Clôturé',
            end: '2024-06-05',
            classe:'Groupe A M2 MIAGE',
            start : '2024-06-01',
            score:0
        },
        {
            id: 2,
            quiz: 'Analyse des algorithmes',
            module: 'Algorithmes et complexité',
            status: 'En cours',
            end: '2024-06-07',
            score:0,
            classe:'Groupe B M2 MIAGE',
            start:'2024-06-06'
        },
        {
            id: 3,
            quiz: 'Fondements de la conception de bases de données',
            module: 'Introduction aux technologies web',
            status: 'En cours',
            end: '2024-07-07',
            start: '2024-05-05',
            score:11.2,
            classe:'Groupe D M1 INFO',
        },
        {
            id: 4,
            quiz: 'Concepts des systèmes dexplotation',
            module: 'Systèmes dexplotation',
            status: 'En cours',
            end: '2024-07-07',
            start: '2024-05-05',
            score:5.5,
            classe:'Groupe A L3 Informatique',
        },
        {
            id: 5,
            quiz: 'Bases des structures de données',
            module: 'Intro aux structures des données',
            status: 'En cours',
            end: '2024-06-05',
            score:0,
            classe:'Groupe A M1 MIAGE',
            start: '2024-06-04'
        },
        {
            id: 6,
            quiz: 'Analyse des algorithmes',
            module: 'Algorithmes et complexité',
            status: 'En cours',
            end: '2024-06-07',
            score:12,
            classe:'Groupe A M2 MIAGE',
            start: '2024-06-05'
        },
        {
            id: 7,
            quiz: 'Fondements de la conception de bases de données',
            module: 'Introduction aux technologies web',
            status: 'Non publié',
            end: '2024-07-07',
            score:0,
            classe:'Groupe A L2 Informatique',
        },
        {
            id: 8,
            quiz: 'Concepts des systèmes dexplotation',
            module: 'Systèmes dexplotation',
            status: 'Non publié',
            end: '2024-05-05',
            score:0,
            classe:'Groupe A L3 Francais',
        },
        {
            id: 9,
            quiz: 'Bases des structures de données',
            module: 'Intro aux structures des données',
            status: 'Clôturé',
            end: '2024-06-05',
            start: '2024-06-01',
            score:0,
            classe:'Groupe E L1 Informatique',
        },
        {
            id: 10,
            quiz: 'Analyse des algorithmes',
            module: 'Algorithmes et complexité',
            status: 'En cours',
            end: '2024-06-07',
            start: '2024-06-02',
            score:17,
            classe:'Groupe A L3 Informatique',
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
