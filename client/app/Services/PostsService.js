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

  async setActivePost(id) {
    try {
      if (ProxyState.posts.filter(p => p.isActivePost == true)) {
        ProxyState.posts.filter(p => p.isActivePost == true).isActivePost = false
      }
      ProxyState.posts.filter(p => p.id != id).isActivePost = true
      // DO CSS & TEMPLATING TO SHOW BODY & COMMENTS IF isActivePost IS TRUE
    } catch (error) {
      console.error(error)
    }
  }

  async addPost(rawPost) {
    try {
      await api.post('api/posts', rawPost)
      ProxyState.posts = [...ProxyState.posts, new Post(rawPost)]
    } catch (error) {
      console.error(error)
    }
  }

  async editPost(id, rawPost) {
    try {
      await api.put('api/posts/' + id, rawPost)
    } catch (error) {
      console.error(error)
    }
  }

  async deletePost(id) {
    try {
      await api.delete('api/posts/' + id)
    } catch (error) {
      console.error(error)
    }
  }
}

export const postsService = new PostsService();

