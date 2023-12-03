import React, { useEffect, useState } from 'react'
import "./Posts.scss"
import { request } from '../../util/Request'
import Share from '../share/Share'
import Post from '../post/Post'

const Posts = () => {

  const [posts, setPosts] = useState([]);

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  useEffect(() => {
    const fetchTimelinePosts = async () => {

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

      const userQueryParam = user ? `&user=${user}` : '';

      try {
        const data = await request(`/post/timelinePosts?${userQueryParam}`, 'GET', headers);
        // console.log(data);
        setPosts(data);
      } catch (error) {
        console.log("Error fetching timeline posts:", error);
      }

    }
    fetchTimelinePosts()
  }, [token, user])

  return (
    <>
      {/* <div className="container"> */}
      <div className="wrapper">
        <Share />
        <div className="posts">
          {posts?.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default Posts
// import React, { useEffect, useState } from 'react';
// import "./Posts.scss";
// import { request } from '../../util/Request';
// import Share from '../share/Share';
// import Post from '../post/Post';

// const Posts = () => {
//   const [posts, setPosts] = useState([]);
//   console.log("🚀 ~ file: Posts.jsx:11 ~ Posts ~ posts:", posts);

//   const token = localStorage.getItem("token");
//   const user = localStorage.getItem("user");

//   useEffect(() => {
//     const fetchTimelinePosts = async () => {
//       const headers = {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       };

//       const userQueryParam = user ? `&user=${user}` : '';

//       try {
//         const data = await request(`/post/timelinePosts?${userQueryParam}`, 'GET', headers);
//         setPosts(data);
//       } catch (error) {
//         console.log("Error fetching timeline posts:", error);
//       }
//     };

//     fetchTimelinePosts();
//   }, [token, user]);

//   return (
//     <>
//       <div className="wrapper">
//         <Share />
//         <div className="posts">
//           {Array.isArray(posts) && posts.length > 0 ? (
//             posts.map((post) => <Post post={post} key={post._id} />)
//           ) : (
//             <p>No posts available.</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Posts;
