import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent {
    @Input() comment: any;

    @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
    @Output() onValid: EventEmitter<number> = new EventEmitter<number>();

    valid(){
        this.onValid.emit(this.comment)
    }

    delete(){
        this.onDelete.emit(this.comment)
    }


    protected readonly alert = alert;
}
