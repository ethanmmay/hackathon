export default class Comment {
  constructor(data) {
    this.title = data.title,
      this._id = data._id || data.id,
      this.upvotes = data.upvotes || 0,
      this.downvotes = data.downvotes || 0
  }

  get Template() {
    return /* html */ `
        <div>
            ${this.title}
        </div>
    `
  }
}
