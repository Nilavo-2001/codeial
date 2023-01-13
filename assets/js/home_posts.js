//ajax req
import { createComment, deleteComment, getComment, createCommentLike } from "./comments_posts.js";

let createPost = () => {
  let form = $("#new-post-form");
  form.submit(function (e) {
    console.log("cp clicked");
    e.preventDefault();
    //console.log(form.serialize());
    $.ajax({
      type: "post",
      url: "/posts/create",
      data: form.serialize(),
      success: function (response) {
        let post = getPost(response.data.posts);
        // console.log(response);
        $("#posts-list-container > ul").prepend(post);
        deletePost(`#post-${response.data.posts._id} .delete-post-button`);
        createComment(`#post-${response.data.posts._id} .new-comment-form`);
        createPostLike(`#post-${response.data.posts._id} .post-like .like-symbol`);
        // deleteComment();
        new Noty({
          theme: "relax",
          text: "Post Created",
          type: "success",
          layout: "topRight",
          timeout: 1500,
        }).show();
        // console.log(response);
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
       <div class="post-like">
    <div data-id="${post._id}" class="like-symbol">
      🤍
    </div>
    <div data-id="${post._id}" class="like-number">
    ${(post.likes.length > 0) ? post.likes.length : ""}
    </div >
  </div >
  <div class="post-comments">

    <form action="/comment/create" method="post" class="new-comment-form">
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
     </li >
  `;
};
let deletePost = (selector) => {
  console.log(`delete post`);
  $(selector).click(function (e) {
    console.log("");
    e.preventDefault();
    $.ajax({
      type: "get",
      url: $(this).prop("href"),
      success: function (response) {
        //console.log(response.data.post_id);
        $(`#post-${response.data.post_id}`).remove();
        new Noty({
          theme: "relax",
          text: "Post Deleted",
          type: "success",
          layout: "topRight",
          timeout: 1500,
        }).show();
      },
      error: function (error) {
        console.log(error);
      },
    });
  });
};
let createPostLike = (selector) => {
  $(selector).click(function (e) {
    // console.log("clicked post like");
    const id = this.getAttribute("data-id");
    let symbol = this;
    $.ajax({
      type: "post",
      url: `/likes/toggle/?id=${id}&&type=Post`,
      success: function (response) {
        console.log(response);
        if (!response.deleted) {
          symbol.innerHTML = "❤️";
        }
        else {
          symbol.innerHTML = "🤍";
        }
        const currentLikes = (response.likes > 0) ? response.likes : "";
        $(`.like-number[data-id=${id}]`).html(currentLikes)
      },
      error: function (error) {
        console.log(error);
      },
    });
  })
}
createPost();
createPostLike(".post-like .like-symbol");
deletePost(".delete-post-button");
