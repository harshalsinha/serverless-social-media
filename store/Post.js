
class Post {
  constructor(id, title, username, content) {
    this.id = id
    this.title = title
    this.username = username
    this.content = content
  }

  save() {
    return SOCIALMEDIA_DB.put(`post:${this.id}`, JSON.stringify(this))
  }
}

export default Post;