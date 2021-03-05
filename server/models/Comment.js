import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.SchemaTypes.ObjectId

const Comment = new Schema(
  {
    title: { type: String, required: true },
    upvotes: { type: Number, required: true },
    downvotes: { type: Number, required: true },
    creatorId: { type: String, ref: 'Account', required: true },
    postId: { type: ObjectId, ref: 'Post', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Comment.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Comment
