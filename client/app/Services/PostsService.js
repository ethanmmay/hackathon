import { ProxyState } from "../AppState.js";
import Post from "../Models/Post.js";
import { api } from "./AxiosService.js";

class PostsService {
  constructor() {
    this.getPosts()
  }

  async getPosts() {
    try {
      const res = await api.get('api/posts')
      ProxyState.posts = res.data.map(p => new Post(p))
    } catch (error) {
      console.error(error)
    }
  }

  async getPost(id) {
    try {
      const res = await api.get('api/posts/' + id)
    } catch (error) {
      next(error)
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

