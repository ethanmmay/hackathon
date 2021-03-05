export default class Post {
  constructor(data) {
    this.title = data.title,
    this.body = data.body || '',
    this.imgUrl = data.imgUrl || '',
    this._id = data._id || data.id,
    this.name = data.creatorId.email.split('@')[0]
  }

  get Template() {
    return /* html */ `
    <div class="row">
      <div class="card col-11 text-left border-radius m-5 tag-font p-5">
          <h2>${this.title}</h2>
          <img class="img-top" src="${this.imgUrl}">
          <h3>${this.body}</h3>
        
          <div class="row ">
            <div class="col-12 d-flex justify-content-center justify-content-between">
              <h3>${this.name}</h3>
              <span onclick="app.commentsController.getComment('')"><h3>COMMENTS</h3></span>
            </div>
          </div>
      </div>
    </div>
    `
  }
}
