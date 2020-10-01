document.addEventListener('DOMContentLoaded', function(){
    /* document.querySelector("#profile").addEventListener('click', profile) */
    console.log('Hello there');
    edit_post();
     
  });
  
  function show_posts(){
       fetch('/posts')
      .then(response => response.json())
      .then(posts => {
       console.log(posts);
  
       posts.forEach(addPost);
  });
  }
   
  function addPost(contents){
      let here = contents
   
      const element = document.createElement('div');
      var author = contents.author
      var body = contents.body
      var time = contents.timestamp
      var the_id = contents.id
      element.innerHTML = `<div class="card" id="the_post">
    <div class="card-body">
      <h5 class="card-title">${author}</h5>
      <a class="card-text" id = "edit_post" style="color:blue;" value="${contents.body}">Edit</a>
      <p class="card-text" id="post_body">${body}</p>
      <h6 class="card-subtitle mb-2 text-muted">${time}</h6>
      <div id="like">
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
  </svg>
   </div>
   </br>
      <h6 class="card-subtitle mb-2 text-muted">Comment</h6>
    </div>
  </div>`
  document.querySelector('#posts').append(element)
  }
  function edit_post(){
  let ch = document.querySelectorAll("#like");
  console.log(`the length is ${ch.length}`)
  for (var i = 0; i < ch.length; i++){
    let but = ch[i];
    but.addEventListener('mouseover', () => {
      but.innerHTML = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
    </svg>`
    })
    but.addEventListener('mouseout', () => {
      but.innerHTML = `    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>`
    })
    console.log(but)

  }
  
  /* document.querySelector("#edit_post").addEventListener('click', () => {
    console.log('You want to edit')
  }) */
  let a = document.querySelectorAll("#edit_post")
 /*  a.forEach(edit_posts) */
  for (var x = 0; x < a.length; x++){
    let here = a[x];
    here.addEventListener('click', () => {
        document.querySelector("#the_post").style.display = "none";
        document.querySelector("#here").style.display = "none";
        console.log(here);
        var val = here.value;
  
        
        document.querySelector('#posts').style.display = 'none';
        const element = document.createElement("div");
        element.innerHTML = `    <div class="form-group" id="editthepost">
        <label for="exampleFormControlTextarea1">Edit Post</label>
      <textarea name="post_body" class="form-control" id="compose-body" placeholder="Body">${here.value}</textarea>
      <button type="button" class="btn btn-primary">Save</button>
  </div>`

      document.querySelector('#post_edit').append(element)
    })
    console.log(here)
    if (document.querySelector("#post_edit")){
        var list = document.querySelector("#editthepost");
        console.log(list);
        /* list.children[0].remove(); */
    }
  }

   
  document.querySelector('#like').addEventListener('click', () => {
    console.log('Clicked')
  })
}
  
  
  
/*   function edit_posts(item, index, arr){
    arr[index].addEventListener('click', () => {
      console.log(arr[index]);
      var val = arr[index].value;
      console.log(val);
      document.querySelector('#posts').style.display = 'none';
      const element = document.createElement("div");
      element.innerHTML = `<div class="form-group">
      <label for="exampleFormControlTextarea1">New Post</label>
    <textarea name="post_body" class="form-control" id="compose-body" placeholder="Body">${contents.body}</textarea>
    <button type="button" class="btn btn-primary">Submit</button>
</div>`
    document.querySelector('#post_edit').append(element)
  })
  } */
  
  function profile(){
    var name = "Odeke";
    prof = document.createElement("div")
    fetch('/profile/Odeke')
    .then(response => response.json())
    .then(prof => {
        console.log(prof)
    })
    prof.innerHTML = `<div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <h6 class="card-subtitle mb-2 text-muted">${name.value}</h6>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </div>
  </div>`
  document.querySelector("#show_profile").append(prof)
  }