console.log("Comment Post is here");
function createComment(selector) {
  console.log("create comment");
  let form = $(selector);
  form.submit(function (e) {
    console.log("create comment clicked");
    e.preventDefault();
    //console.log($(this).serialize());
    $.ajax({
      type: "post",
      url: "/comment/create",
      data: $(this).serialize(),
      success: function (response) {
        //console.log(response.data.comment._id);
        let comment = getComment(response.data.comment);
        $(`#post-comments-${response.data.comment.post}`).prepend(comment);
        deleteComment(
          `#comment-${response.data.comment._id} .delete-comment-button`
        );
        createCommentLike(`#comment-${response.data.comment._id} + .comment-like .like-symbol`);
        new Noty({
          theme: "relax",
          text: "Comment Created",
          type: "success",
          layout: "topRight",
          timeout: 1500,
        }).show();
      },
    });
  });
}
let getComment = (comment) => {
  return `<p id="comment-${comment._id}">
  <small>
    <button>
      <a
        class="delete-comment-button"
        href="/comment/destroy/${comment._id}"
      >
        Delete
      </a>
    </button>
  </small>
  ${comment.content}
  <br />
  <small> ${comment.user.name} </small>
</p>
<div class="comment-like">
    <div data-id="${comment._id}" class="like-symbol">
      🤍
    </div>
    <div data-id="${comment._id}" class="like-number">
    ${(comment.likes.length > 0) ? comment.likes.length : ""}
    </div >
</div >
`;
};
function deleteComment(selector) {
  console.log(`delete comment`);
  $(selector).click(function (e) {
    console.log("I am clicked");
    e.preventDefault();
    $.ajax({
      type: "get",
      url: $(this).prop("href"),
      success: function (response) {
        //console.log(response.data.post_id);
        $(`#comment-${response.data.comment_id}`).remove();
        new Noty({
          theme: "relax",
          text: "Comment Deleted",
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
}
function createCommentLike(selector) {
  console.log("I am called");
  //console.log(document.querySelectorAll(selector));
  $(selector).click(function (e) {
    console.log("comment like clicked");
    const id = this.getAttribute("data-id");
    let symbol = this;
    $.ajax({
      type: "post",
      url: `/likes/toggle/?id=${id}&&type=Comment`,
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
createCommentLike(".comment-like .like-symbol");
createComment(".new-comment-form");
deleteComment(".delete-comment-button");

