import {
  dbContext
} from '../db/DbContext'
import {
  BadRequest
} from '../utils/Errors'

class CommentService {
  async find(query = {}) {
    return await dbContext.Comments.find(query).populate('postId')
  }

  async findById(id) {
    const comment = await dbContext.Comments.findById(id)
    if (!comment) {
      throw new BadRequest('Invalid Id')
    }
    return comment
  }

  async create(body) {
    return await dbContext.Comments.create(body)
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
