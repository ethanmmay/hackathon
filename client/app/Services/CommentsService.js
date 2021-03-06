import {
  ProxyState
} from "../AppState.js";
import Comment from "../Models/Comment.js";
import {
  api
} from "./AxiosService.js";

class CommentsService {
  constructor() {
    this.getComments()
  }

  async getComments() {
    try {
      const res = await api.get('api/comments')
      ProxyState.comments = res.data.map(p => new Comment(p))
    } catch (error) {
      console.error(error)
    }
  }

  async addComment(rawComment) {
    try {
      await api.comment('api/comments', rawComment)
      ProxyState.comments = [...ProxyState.comments, new Comment(rawComment)]
    } catch (error) {
      console.error(error)
    }
  }

  async editComment(id, rawComment) {
    try {
      await api.put('api/comments/' + id, rawComment)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteComment(id) {
      try {
          await api.delete('api/comments/' + id)
      } catch (error) {
          console.error(error)
      }
  }
}

export const commentsService = new CommentsService();
