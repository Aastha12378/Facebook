import React, { useState } from 'react';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [image, setImage] = useState(null);

  const handleTextChange = (e) => {
    setNewPost(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim() !== '' || image) {
      const newPostData = {
        text: newPost,
        image: image,
      };
      setPosts([...posts, newPostData]);
      setNewPost('');
      setImage(null);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">Create a Post</div>
            <div className="card-body">
              <form onSubmit={handlePostSubmit}>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="What's on your mind?"
                    value={newPost}
                    onChange={handleTextChange}
                    rows="3"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImageChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Post
                </button>
              </form>
            </div>
          </div>

          <div className="mt-4">
            {posts.map((post, index) => (
              <div className="card mb-3" key={index}>
                <div className="card-body">
                  {post.text && <p>{post.text}</p>}
                  {post.image && <img src={post.image} alt="post" className="img-fluid" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
