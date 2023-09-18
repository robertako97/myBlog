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

const postDeleteButtons = document.querySelectorAll('.post-delete-button');

postDeleteButtons.forEach((button) => {
    button.addEventListener('click', async () => {
        const postId = button.parentElement.id.split('-')[1];

        try {
            const response = await fetch(`/delete-post/${postId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Handle successful post deletion, e.g., update UI
                // You may remove the deleted post container from the UI
                document.getElementById(`post-${postId}`).remove();
            } else {
                // Handle deletion error, e.g., display an error message
                console.error('Error deleting the post');
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error);
        }
    });
});
