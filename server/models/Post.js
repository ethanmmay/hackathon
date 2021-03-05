import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Post = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: false },
    imgUrl: { type: String, required: true },
    upvotes: { type: Number, required: true },
    downvotes: { type: Number, required: true },
    creatorId: { type: String, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Post.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Post
