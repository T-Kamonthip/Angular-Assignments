import { Injectable } from '@angular/core';
import { IComment } from './comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private commentList: IComment[] = [];
  constructor() {}

  private genUUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }

  getCommentList() {
    return this.commentList;
  }

  getCommentById(id: string) {
    return this.commentList.filter((f) => f.id == id)[0] || [];
  }

  addComment(comment: IComment) {
    var dt = new Date();
    dt.setUTCHours(dt.getUTCHours()+7);
    console.log(dt);
    const newComment = {
      ...comment,
      id: this.genUUID(),
      datetime: dt.toUTCString()+'+7',
    };

    console.log('new comment = ', newComment);

    this.commentList.push(newComment);
  }

  editComment(com: IComment) {
    this.commentList.forEach((c) => {
      if (c.id == com.id) {
        // console.log('found');
        c['id'] = com.id;
        c['name'] = com.name;
        c['comment'] = com.comment;
        c['datetime'] = com.datetime;
      }
    });
  }

  deleteComment(id: string) {
    // console.log('delete')
    // const _com = this.commentList.filter((c) => {
    //   return c.id != id;
    // });

    // this.commentList = [..._com];

    this.commentList.forEach((c, i) => {
      if (c.id == id) {
        this.commentList.splice(i, 1);
      }
    });
  }
}
