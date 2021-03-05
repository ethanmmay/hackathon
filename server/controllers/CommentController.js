import BaseController from '../utils/BaseController'
import {
  Auth0Provider
} from '@bcwdev/auth0provider'
import commentService from '../services/CommentService'

export class CommentController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .delete('/:id', this.delete)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      res.send({
        message: 'Data Retrieved',
        data: await commentService.find(req.query)
      })
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      res.send({
        message: 'Data Retrieved',
        data: await commentService.findById(req.params.id)
      })
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send({
        message: 'Data Created',
        data: await commentService.create(req.body)
      })
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      res.send({
        message: 'Data Deleted',
        data: await commentService.delete(req.params.id, req.userInfo.id)
      })
    } catch (error) {
      next(error)
    }
  }
}
