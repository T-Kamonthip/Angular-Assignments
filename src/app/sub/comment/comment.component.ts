import { Component, OnInit } from '@angular/core';
import { IComment } from './comment';
import { CommentService } from './comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  comment: IComment = {
    id: '',
    name: '',
    comment: '',
    datetime: '',
  };

  commentList: IComment[] = [];

  constructor(private comService: CommentService) {}

  ngOnInit(): void {
    this.commentList = this.comService.getCommentList();
  }

  editComment(id: string) {
    this.comment = { ...this.comService.getCommentById(id) };
  }

  deleteComment(id: string) {
    console.log('clicked del')
    this.comService.deleteComment(id);
  }

  onSubmit() {
    if (this.comment.id == '') {
      console.log('add');
      this.comService.addComment(this.comment);
      this.clearForm();
    } else {
      console.log('edit');
      this.comService.editComment(this.comment);
      this.clearForm();
    }
  }

  clearForm() {
    this.comment = {
      id: '',
      name: '',
      comment: '',
      datetime: '',
    };
  }
}
