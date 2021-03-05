import { ProxyState } from "../AppState.js";
import Post from "../Models/Post.js";

class PostsService {
  constructor(){
    console.log('hooked to post service');
  }
  addPost() {
   
  }
}

export const postsService = new PostsService();

