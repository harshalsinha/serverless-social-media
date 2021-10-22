import { Router } from 'itty-router'
import Post from './store/Post'
import { v4 as uuidv4 } from 'uuid';

// Create a new router
const router = Router()

router.get("/", () => {
  return new Response("Hello, world! This is the root page of your Worker template.")
})

//Utility function to fetch posts from the KV
async function getPosts() {

  try{
    const keyList =  await SOCIALMEDIA_DB.list()
    const numberOfPosts = keyList["keys"].length;
    var posts = []
    for(var i = 0; i < numberOfPosts; i++)
    {
      var postId = keyList["keys"][i]["name"]
      var post = await SOCIALMEDIA_DB.get(postId)
      console.log(`Pushing post: ${post}`)
      posts.push(post)
    }
    return posts;
  }catch(err)
  {
    return new Response(err)
  }
}


router.get("/posts", async () => {
  try{
    //Get the posts from KV
    var posts = await getPosts()

    //Respond with the posts fetched from KV
    return new Response(posts)
  }catch(err)
  {
    return new Response(err)
  }
})

router.post("/addPost",async request => {
try{

  let fields = {
    "asn": request.cf.asn,
    "colo": request.cf.colo
  }

  // If the POST data is JSON
  if (request.headers.get("Content-Type") === "application/json") {
    fields["json"] = await request.json()
  }
  //Generate new id for the post
  const id = uuidv4();
  
  //Create new Post object
  const post = new Post(id, fields["json"].title, fields["json"].username,
  fields["json"].content)
  
  //Save the post to KV
  await post.save();
  
  //Get and return the updated list of Posts
  const posts = await getPosts()
  return new Response(posts)
}catch(err){
  return new Response(err)
}

})

/*
This is the last route we define, it will match anything that hasn't hit a route we've defined
above, therefore it's useful as a 404 (and avoids us hitting worker exceptions, so make sure to include it!).

Visit any page that doesn't exist (e.g. /foobar) to see it in action.
*/
router.all("*", () => new Response("404, not found!", { status: 404 }))

/*
This snippet ties our worker to the router we deifned above, all incoming requests
are passed to the router where your routes are called and the response is sent.
*/
addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request))
})
