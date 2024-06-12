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

    public onDeleteItem(id: number){
        console.log({id});
    }

    public onValidItem(id: number){
        console.log({id});
    }
}
