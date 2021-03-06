import BaseController from '../utils/BaseController'
import {
  Auth0Provider
} from '@bcwdev/auth0provider'
import postService from '../services/PostService'
import commentService from '../services/CommentService'

export class PostController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/comments', this.getComments)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .delete('/:id', this.delete)
      .post('', this.create)
      .put('/:id', this.edit)
  }

  async getAll(req, res, next) {
    try {
      res.send(await postService.find(req.query))
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      res.send(await postService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send(await postService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      res.send(await postService.delete(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }
  
  async edit(req, res, next) {
    try {
      res.send(await postService.edit(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async getComments(req, res, next) {
    try {
      res.send(await commentService.find(req.params.id))
    } catch (error) {
      next(error)
    }
  }
}
