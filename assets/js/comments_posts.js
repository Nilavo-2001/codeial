let createComment = () => {
  let form = $(".new-comment-form");
  form.submit(function (e) {
    console.log("I am clicked");
    e.preventDefault();
    //console.log($(this).serialize());
    $.ajax({
      type: "post",
      url: "/comment/create",
      data: $(this).serialize(),
      success: function (response) {
        //console.log(response.data.comment.post);
        let comment = getComment(response.data.comment);
        $(`#post-comments-${response.data.comment.post}`).prepend(comment);
      },
    });
  });
};
let getComment = (comment) => {
  return `<p>
  <small>
    <button>
      <a href="/comment/destroy/${comment.id}"> Delete </a>
    </button>
  </small>
  ${comment.content}
  <br />
  <small> ${comment.user.name} </small>
</p>`;
};
function deleteComment() {
  console.log(`delete comment`);
  $(".delete-comment-button").click(function (e) {
    console.log("I am clicked");
    e.preventDefault();
    $.ajax({
      type: "get",
      url: $(this).prop("href"),
      success: function (response) {
        console.log(response.data.post_id);
        $(`#comment-${response.data.post_id}`).remove();
      },
      error: function (error) {
        console.log(error);
      },
    });
  });
}
deleteComment();
createComment();
