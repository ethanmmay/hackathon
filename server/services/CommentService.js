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
}

const commentService = new CommentService()
export default commentService
