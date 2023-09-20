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
    const button = event.target.closest('.deleteB'); // Replace 'your-button-class' with your actual class name

    if (button) {
        const id = button.getAttribute('data-id');

        const response = await fetch(`/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
        }
    }
};

document.addEventListener('click', delButtonHandler);


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


const comment = async (event) => {
    const button = event.target.closest('.commentB'); // Replace 'your-button-class' with your actual class name
    const comments = document.querySelector('#commentID').value.trim();

    if (button) {
        if (button.classList.contains('commentB')) {
            const post_id = button.getAttribute('data-id');
            const response = await fetch('/create-comment', {
                method: 'POST',
                body: JSON.stringify({comments, post_id}),
                headers: {'Content-Type': 'application/json'},
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                alert('Error sharing your thought.');
            }
        }
    }
};

document.addEventListener('click', comment);
