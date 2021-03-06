import { ProxyState } from "../AppState.js";
import Post from "../Models/Post.js";
import { postsService } from "../Services/PostsService.js";

//Private
function _draw() {
  let posts = ProxyState.posts;
  let template = ''
  

  posts.forEach(p => template += p.Template)
  document.getElementById('posts').innerHTML = template
}

//Public
export default class PostsController {
  constructor() {
    ProxyState.on("posts", _draw);
  }

  createPost(event) {
    event.preventDefault()
    let form = event.target
    let rawPost = new Post({
      title: form.title.value,
      body: form.body.value,
      imgUrl: form.imgUrl.value
    })
    postsService.addPost(rawPost)
  }

  getPostById(id) {
    postsService.getPostById(id)
  }

  editPost(id, event) {
    event.preventDefault()
    let form = event.target
    let rawPost = {
      title: form.title.value,
      body: form.body.value,
      imgUrl: form.imgUrl.value
    }
    postsService.editPost(id, rawPost)
  }



}
