import {
  ProxyState
} from "../AppState.js";
import {
  commentsService
} from "../Services/CommentsService.js";

//Private
function _draw() {
    ProxyState.posts.forEach(p => {

        let template = ''
        let comments = ProxyState.comments.filter(c => c.postId == p._id)
        comments.forEach(c => template += c.Template)
        document.getElementById('comments-' + p._id)
    })
}

//Public
export default class CommentsController {
  constructor() {
    ProxyState.on("comments", _draw);
    _draw()
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
