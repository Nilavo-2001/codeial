{
  //ajax req
  let createPost = () => {
    let form = $("#new-post-form");
    form.submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/posts/create",
        data: form.serialize(),
        success: function (response) {
          let post = getPost(response.data.posts);
          $("#posts-list-container ul").prepend(post);
          console.log(response);
        },
        error: function (error) {
          console.log(error);
        },
      });
    });
  };
  let getPost = (post) => {
    return `<li id="post-${post._id}">
       <p>
         <small>
           <button>
             <a class="delete-post-button" href="/posts/destroy/${post._id}">
               Delete
             </a>
           </button>
         </small>
         ${post.content}
         <br />
         <small> ${post.user.name} </small>
       </p>
       <div class="post-comments">
       
         <form action="/comment/create" method="post">
           <input
             type="text"
             name="content"
             placeholder="Type your comment here..."
           />
           <input type="hidden" name="post" value="${post._id}" />
           <input type="submit" value="Add comment" />
         </form>
         
         <div class="post-comments-list">
           <ul id="post-comments-${post._id}">
             
           </ul>
         </div>
       </div>
     </li>
     `;
  };
  createPost();
}
