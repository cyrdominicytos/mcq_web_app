import { Component, Input } from '@angular/core';
import { Qcm } from '../core/models/qcm.model';
import { QcmService } from '../service/qcm.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { catchError, Observable, of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-qcm-detail',
  templateUrl: './qcm-detail.component.html',
  styleUrls: ['./qcm-detail.component.css']
})
export class QcmDetailComponent {
    qcm: any = {};

    commentAnswerId = 0;

    constructor(
        private qcmService: QcmService,
        private router:ActivatedRoute,
    ) {
    }

    ngOnInit(){
        this.router.paramMap.pipe(
            switchMap((params: ParamMap) => {
                const id = params.get('id');
                if (id != null){
                    return this.qcmService.getQcm(id);
                }
                return new Observable<any>();
            }),
            catchError(error => {
                return of(null);
            })
        ).subscribe((value?: any) => {
            if (value != null){
                this.qcm = value;
            }
        })
    }


    showComment(answerId: number){
        if (answerId == this.commentAnswerId){
            this.commentAnswerId = 0;
        }else {
            this.commentAnswerId = answerId;
        }
    }

    onDeleteAnswer(answer: any){
        const res = confirm("Souhaitez-vous effectuer cette opération ?")
        if (res){
            const questionId = answer.questionId;
            const index = this.qcm.questions.findIndex((s: any) =>  s.id == questionId);
            if (index != -1){
                let question = this.qcm.questions[index];
                question.answers = question.answers.filter((a: any) => {
                    return a.id != answer.id;
                })
                const toast: any = Swal.mixin({
                    toast: true,
                    position: 'top-right',
                    showConfirmButton: false,
                    timer: 3000,
                    customClass: { container: 'toast' },
                });
                toast.fire({
                    icon: "success",
                    title: "Proposition supprimée avec succès",
                    padding: '10px 20px',
                });
            }
        }
    }

}
