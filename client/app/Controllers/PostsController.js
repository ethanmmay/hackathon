import { ProxyState } from "../AppState.js";
import { postsService } from "../Services/PostsService.js";

//Private
function _draw() {
  let posts = ProxyState.posts;
  console.log(posts);
}

//Public
export default class PostsController {
  constructor() {
    
    ProxyState.on("posts", _draw);
  }

  createPost(event) {
    event.preventDefault
    let form = event.target
    let rawPost = {
      title: form.title.value,
      body: form.body.value,
      imgUrl: form.imgUrl.value,
      upvotes
    }
    postsService.addPost()
  }

}
