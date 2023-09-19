document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-button');
    const postForm = document.getElementById('post-form');

    addButton.addEventListener('click', function () {
        // Toggle the visibility of the form
        if (postForm.style.display === 'none' || postForm.style.display === '') {
            postForm.style.display = 'block';
        } else {
            postForm.style.display = 'none';
        }
    });
});


const postPost = async (event) =>{
    event.preventDefault();

    const title = document.querySelector('#post_title').value.trim();
    const post_content = document.querySelector('#post_content').value.trim();


    if (title && post_content ) {
        const response = await fetch('/create-post', {
            method: 'POST',
            body: JSON.stringify({ title, post_content }),
            headers: { 'Content-Type': 'application/json' },

        });


        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Error posting your iDea.');

        }
    }
};

document
    .querySelector('#post-form')
    .addEventListener('submit', postPost);


const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to delete post.');
        }
    }
};

document
    .querySelector('#post-list')
    .addEventListener('click', delButtonHandler);






document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('comments-button');
    const comments = document.getElementsByClassName('commentsID');

    addButton.addEventListener('click', function () {
        // Toggle the visibility of each element in the collection
        for (let i = 0; i < comments.length; i++) {
            const comment = comments[i];
            if (comment.style.display === 'none' || comment.style.display === '') {
                comment.style.display = 'block';
            } else {
                comment.style.display = 'none';
            }
        }
    });
});
