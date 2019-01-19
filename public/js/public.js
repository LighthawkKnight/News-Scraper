$(document).ready(function () {

$('.comment-btn').click(function(event) {

    event.preventDefault();
    const id = $(this).attr("data");

    $('#post-title').text(id);
    $('#save-comment').attr('data', id);
    $.ajax(`/api/comment/${id}`, {
        type: "GET"
    }).then(data => {
        // console.log(data);
        $('.posts-available').empty();
        if (data[0].comment.length > 0){
            data[0].comment.forEach(comment => {
                $('.posts-available').append($(`
                    <li class='list-group-item'>${comment.text}
                        <button type='button' id = 'delete-comment' class='btn btn-danger btn-sm float-right delete-comment-btn' data='${comment._id}'>X</button>
                    </li>`
                ));
            })
        }
        else {
            $('.posts-available').append($(`<li class='list-group-item'>No comments yet</li>`));
        }
    })
    $('#comment-modal').modal('toggle');
});

$("#save-comment").click(function(event) {

    event.preventDefault();
    const id = $(this).attr('data');
    const commentText = $('#comment-input').val().trim();

    console.log(id);
    console.log(commentText);

    $('#comment-input').val('');
    $.ajax(`/api/comment/${id}`, {
        type: "POST",
        data: { text: commentText}
    }).then(function (data) {
        console.log(data)
    })
    $('#comment-modal').modal('toggle');
});


// $('.delete-comment-btn').click(function(event)  {
$(document).on('click', '.delete-comment-btn', function() {

    event.preventDefault();
    const id = $(this).attr("data");

    $.ajax(`/api/comment/${id}`, {
        type: "DELETE"
    }).then(function () {
        $('#comment-modal').modal('toggle');
    });
});

});