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
createComment(".new-comment-form");
deleteComment(".delete-comment-button");
export { deleteComment, createComment, getComment };
