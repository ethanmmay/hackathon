import { ProxyState } from "../AppState.js";
import Post from "../Models/Post.js";
import { api } from "./AxiosService.js";

class PostsService {
  constructor(){
    console.log('hooked to post service');
    this.getPosts()
  }

  async getPosts(){
    try {
      const res = await api.get('api/posts')
      console.log(res.data.data)
      ProxyState.posts = res.data.data.map(p => new Post(p))
      console.log(ProxyState.posts)
    } catch (error) {
      console.error(error)
    }
  }
  async addPost(rawPost) {
    try {
      let post = await api.post('api/posts')
      ProxyState.posts = [...ProxyState.posts, new Post(rawPost)]
    } catch (error) {
      console.error(error)
    }
  }
}

export const postsService = new PostsService();

