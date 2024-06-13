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
    edit: boolean = false;
    message: string = "";


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
        this.message = "Suggestion acceptée";
        this.updateAnswer();
    }
    onDelete(){
        this.deleteAnswer.emit(this.answer);
    }

    onChangeTitle() {
        this.edit = false;
        this.message = "proposition modifiée avec succès";
        this.updateAnswer();
    }

    updateAnswer(){
        this.answerService.update(this.answer).subscribe((res: any) => {
            this.toastService.showMessage(this.message, "success")
        })
    }
}
