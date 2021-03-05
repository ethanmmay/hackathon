import BaseController from '../utils/BaseController'
import {
  Auth0Provider
} from '@bcwdev/auth0provider'
import postService from '../services/PostService'

export class PostController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      res.send({ message: 'Data Retrieved', data: await postService.find(req.query) })
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      res.send({ message: 'Data Retrieved', data: await postService.findById(req.params.id) })
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send({ message: 'Data Created', data: await postService.create(req.body) })
    } catch (error) {
      next(error)
    }
  }
}
