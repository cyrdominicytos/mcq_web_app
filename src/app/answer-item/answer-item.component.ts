import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-answer-item',
  templateUrl: './answer-item.component.html',
  styleUrls: ['./answer-item.component.css']
})
export class AnswerItemComponent {
    @Input() answer: any = {}
    showComment = false;
    total: number = 0;

    ngOnInit(){
        this.total = this.answer.comments.length;
    }

    updateTotal(total: number){
        this.total = total;
    }

    updateSuggestion(suggestion: string){
        this.answer.title = suggestion;
    }
}
