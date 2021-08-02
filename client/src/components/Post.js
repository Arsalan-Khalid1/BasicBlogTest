import "./Post.css";
import { Fragment, useEffect, useState } from "react";

const Post = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getBlogPosts();
  }, []);

  const getBlogPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/blogPost");
      const jsonData = await response.json();
      const { posts } = jsonData;
      setPosts([...posts]);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      {posts.map(function (post, key) {
        return (
          <div className="post" key={key}>
            <img src={post.photo} alt="" className="postImg" />
            <div className="postInfo">
              <div className="postCats">
                <span className="postCat">Life</span>
                <span className="postCat">Tech</span>
              </div>
              <span className="postTitle">{post.title}</span>
              <hr />
              <span className="postDate">{post.createdAt}</span>
            </div>
            <p className="postDesc">{post.desc}</p>
          </div>
        );
      })}
    </>
  );
};

export default Post;
