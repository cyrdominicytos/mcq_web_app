import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-answer-item',
  templateUrl: './answer-item.component.html',
  styleUrls: ['./answer-item.component.css']
})
export class AnswerItemComponent {
    @Input() answer: any = {}
    showComment = false;
}
