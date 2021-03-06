import {
  ProxyState
} from "../AppState.js";
import {
  commentsService
} from "../Services/CommentsService.js";

//Private
function _draw() {
}

//Public
export default class CommentsController {
  constructor() {
    ProxyState.on("comments", _draw);
  }

  createComment(event) {
    event.preventDefault()
    let form = event.target
    let rawComment = {
      title: form.title.value,
      body: form.body.value,
      imgUrl: form.imgUrl.value
    }
    commentsService.addComment(rawComment)
  }

  editComment(id, event) {
    event.preventDefault()
    let form = event.target
    let rawComment = {
      title: form.title.value,
      body: form.body.value,
      imgUrl: form.imgUrl.value
    }
    commentsService.editComment(id, rawComment)
  }

  deleteComment(id) {
      commentsService.deleteComment(id)
  }
}
