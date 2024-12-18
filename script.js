fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(posts => {
    const postContainer = document.getElementById('posts');
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <button class="edit-btn" data-id="${post.id}">Edit</button>
        <button class="delete-btn" data-id="${post.id}">Delete</button>
      `;
      postContainer.appendChild(postElement);
    });
  });

// Add a new post
document.getElementById('addPostForm').addEventListener('submit', event => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body }),
  })
  .then(response => response.json())
  .then(newPost => {
    const postContainer = document.getElementById('posts');
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <h3>${newPost.title}</h3>
      <p>${newPost.body}</p>
      <button class="edit-btn" data-id="${newPost.id}">Edit</button>
      <button class="delete-btn" data-id="${newPost.id}">Delete</button>
    `;
    postContainer.prepend(postElement);
    document.getElementById('addPostForm').reset();
  });
});

// Edit and delete posts
document.addEventListener('click', event => {
  const postId = event.target.dataset.id;

  // Edit post
  if (event.target.classList.contains('edit-btn')) {
    const postElement = event.target.parentElement;
    const currentTitle = postElement.querySelector('h3').innerText;
    const currentBody = postElement.querySelector('p').innerText;

    const updatedTitle = prompt('Edit Title', currentTitle);
    const updatedBody = prompt('Edit Content', currentBody);

    if (updatedTitle && updatedBody) {
      fetch('https://jsonplaceholder.typicode.com/posts/${postId}', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: updatedTitle, body: updatedBody }),
      })
      .then(response => response.json())
      .then(updatedPost => {
        postElement.querySelector('h3').innerText = updatedPost.title;
        postElement.querySelector('p').innerText = updatedPost.body;
      });
    }
  }

  // Delete post
  if (event.target.classList.contains('delete-btn')) {
    fetch('https://jsonplaceholder.typicode.com/posts/${postId}' , {
      method: 'DELETE',
    })
    .then(() => {
      event.target.parentElement.remove();
    });
    
  }
});