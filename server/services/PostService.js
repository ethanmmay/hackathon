import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class PostService {
  async find(query = {}) {
    return await dbContext.Posts.find(query).populate('creatorId', '-subs')
  }

  async findById(id) {
    const post = await dbContext.Posts.findById(id).populate('creatorId', '-subs')
    if (!post) {
      throw new BadRequest('Invalid Id')
    }
    return post
  }

  async create(body) {
    return await dbContext.Posts.create(body)
  }

  async edit(id, body) {
    return await dbContext.Posts.findByIdAndUpdate(id, body)
  }
}

const postService = new PostService()
export default postService
