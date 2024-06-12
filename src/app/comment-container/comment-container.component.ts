import { Component, Input } from '@angular/core';
import { co } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-comment-container',
  templateUrl: './comment-container.component.html',
  styleUrls: ['./comment-container.component.css']
})
export class CommentContainerComponent {

    @Input() comments = [];

    ngOnInit(){
        console.log({
            comments: this.comments
        });
    }

    public onDeleteItem(comment: object){
        console.log(comment);
    }

    public onValidItem(comment: object){
        console.log(comment);
    }
}
