import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentService } from '../service/comment.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comment-container',
  templateUrl: './comment-container.component.html',
  styleUrls: ['./comment-container.component.css']
})
export class CommentContainerComponent {

    @Input() comments: any = [];

    @Output() updateTotal: EventEmitter<any> = new EventEmitter<any>();
    constructor(
        private commentService: CommentService
    ) {

    }


    ngOnInit(){
        console.log({
            comments: this.comments
        });
    }

    public onDeleteItem(comment: any){
        let response: Observable<any> = new Observable<any>();
        if (Object.hasOwn(comment, 'answerId')){
            response = this.commentService.deleteAnswerComment(comment.id)
        }else if (Object.hasOwn(comment, 'questionId')){
            response = this.commentService.deleteQuestionComment(comment.id)
        }
        response.subscribe((result) => {
            this.comments = this.comments.filter((s: any) => {
                return s.id != comment.id
            })
            this.updateCommentCount();
        });
    }

    public onValidItem(comment: any){
        let response: Observable<any> = new Observable<any>();
        if (Object.hasOwn(comment, 'answerId')){
            response = this.commentService.validAnswerComment(comment)
        }else if (Object.hasOwn(comment, 'questionId')){
            response = this.commentService.validQuestionComment(comment)
        }
        response.subscribe((result) => {
            alert("valiate !")
            window.location.reload();
        });
    }


    updateCommentCount(){
        this.updateTotal.emit(this.comments.length);
    }
}
