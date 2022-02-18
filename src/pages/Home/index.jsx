import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import Post from '../../components/Post';
import PostForm from '../../components/PostForm';
import './index.scss';

const Home = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const userToken = useSelector(state => state.token);
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    axios
  .get('http://localhost:1337/posts?_sort=created_at:desc')
  .then(response => {
    setPostList(response.data);
  })
  .catch(error => {
    console.log('An error occurred:', error.response);
  });
  }, []);
  const handleNewPost = (newPost) => {
    setPostList([newPost].concat(postList));
  };
  
  const handleDelete = (postID) => {
    setPostList(postList.filter(post => post.id !== postID));
    axios.delete(`http://localhost:1337/posts/${postID}`,
    {
      headers: {
        Authorization:
          `Bearer ${userToken}`,
      },
    });
  }; 
  return (
    <>
      <h1>Bienvenue sur <strong>Rikiki Social Network!</strong></h1>
      <p>Viens enrichir la communauté, en publiant les actualités près de chez toi, ici il n'y a pas de filtre, tu peux balancer tous les infos que tu veux sans retenu.</p>
      <br/>
      {isLoggedIn && <PostForm handleNewPost={handleNewPost} />}
      <br/>
      <h2>Fil d'actualités</h2>
      <div className="posts-list">
        {postList.map(element => <Post key={element.id} id={element.id} text={element.text} username={element.user.username} userID={element.user.id} like={element.like} handleDelete={handleDelete}/>)}
      </div>      
    </>
  )  
};
export default Home;