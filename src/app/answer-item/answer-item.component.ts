import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastService } from '../service/toast.service';
import { AnswerService } from '../service/answer.service';

@Component({
  selector: 'app-answer-item',
  templateUrl: './answer-item.component.html',
  styleUrls: ['./answer-item.component.css']
})
export class AnswerItemComponent {
    @Input() answer: any = {}
    @Output() deleteAnswer: EventEmitter<any> = new EventEmitter<any>();
    showComment = false;
    total: number = 0;


    constructor(
        private toastService: ToastService,
        private answerService: AnswerService,
    ) {
    }


    ngOnInit(){
        this.total = this.answer.comments.length;
    }

    updateTotal(total: number){
        this.total = total;
    }

    updateSuggestion(suggestion: string){
        this.answer.title = suggestion;
        this.answerService.update(this.answer).subscribe((res: any) => {
            this.toastService.showMessage("Suggestion acceptée", "success")
        })
    }

    onDelete(){
        this.deleteAnswer.emit(this.answer);
    }
}
