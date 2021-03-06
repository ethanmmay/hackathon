export default class Post {
  constructor(data) {
    this.title = data.title,
      this.body = data.body || '',
      this.imgUrl = data.imgUrl,
      this._id = data._id || data.id,
      this.upvotes = data.upvotes || 0,
      this.downvotes = data.downvotes || 0,
      this.isActivePost = false
    try {
      this.name = data.creatorId.name.split('@')[0]
    } catch (error) {
      this.name = 'Unavailable'
    }

  }

  get Template() {
    return /* html */ `
    <div class="row">
        <div class="card col-11 bg-dark text-left border-radius m-5 tag-font p-5">
                    <h2>${this.title}</h2>
                    <img class="img-top" src="${this.imgUrl}">
                    <h3>${this.body}</h3>
        
          <div class="row pt-3">
​
                      <div class="col-8 d-flex justify-content-center justify-content-between">
                            <h3>User: ${this.name}</h3>
                            </div>
                            <div class="col-4">
                            <div class="row justify-content-center">               
                            <button class="tag-font1" onclick="app.commentsController.getComments('')"><h3>COMMENT</h3></button>
                            </div>
                        </div>  
                        <div class="col-12">
                          <button class="round-button rounded-circle pt-2" onclick="app.postsController.upvote(event)"></button>
                          <label class="" for="upvote">UP-VOTE - ${this.upvotes}</label>
                        </div>                            
                        <div class="col-12">
​
                          <button class="round-button rounded-circle pt-2 " onclick="app.postsController.downvote(event)"></button>
                          <label class="" for="upvote">DOWN-VOTE - ${this.downvotes}</label>
​
                        </div>
              
                  </div>
                
        </div>
    </div>

    `
  }
}
