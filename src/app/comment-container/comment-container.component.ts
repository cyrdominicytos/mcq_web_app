import { Component, Input } from '@angular/core';

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
}
