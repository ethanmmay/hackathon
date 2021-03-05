export default class Post {
  constructor(data) {
    this.title = data.title,
    this.body = data.body || '',
    this.imgUrl = data.imgUrl || '',
    this._id = data._id || data.id
  }

  get Template() {
    return /* html */ `
    <div>${this.title}</div>
    `
  }
}
