import {
  dbContext
} from '../db/DbContext'
import {
  BadRequest
} from '../utils/Errors'

class CommentService {
  async find(query = {}) {
    return await dbContext.Comments.find(query).populate('creatorId postId', '-subs')
  }

  async findById(id) {
    const post = await dbContext.Comments.findById(id).populate('creatorId postId', '-subs')
    if (!post) {
      throw new BadRequest('Invalid Id')
    }
    return post
  }

  async create(body) {
    return await dbContext.Comments.create(body)
  }

  async edit(id, body) {
    return await dbContext.Comments.findByIdAndUpdate(id, body)
  }

  async getByPostId(postId) {
    return await dbContext.Comments.find({ postId: postId })
  }

  async delete(commentId, deletorId) {
    const comment = await dbContext.Comments.findOneAndDelete({ _id: commentId, creatorId: deletorId })
    if (!comment) {
      throw new BadRequest('You are not the creator, or that is not the correct comment Id')
    }
    return comment
  }
}

const commentService = new CommentService()
export default commentService
