console.log("Comment Post is here");
let createComment = () => {
  console.log("create comment");
  let form = $(".new-comment-form");
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
        deleteComment();
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
};
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
function deleteComment() {
  console.log(`delete comment`);
  $(".delete-comment-button").click(function (e) {
    console.log("I am clicked");
    e.preventDefault();
    return;
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
deleteComment();
createComment();
//export { deleteComment, createComment, getComment };
