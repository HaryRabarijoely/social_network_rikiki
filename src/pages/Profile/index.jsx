import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';
import Post from "../../components/Post";
import './index.scss';




const Profile = () => {
    const { userID } = useParams();
    const userToken = useSelector(state => state.token);
    const currentUserID = useSelector(state => state.id);
    const [userInfo, setUserInfo] = useState({});
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        let userToFind;
        userID && userID !== currentUserID ? userToFind = userID : userToFind = "me";
        axios.get(`http://localhost:1337/users/${userToFind}`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            }
        })
            .then(response => { setUserInfo(response.data) });
    }, [currentUserID, userID, userToken]);

    useEffect(() => {
    let userToFind;
    userID ? userToFind = userID : userToFind = currentUserID;
    axios.get(
      `http://localhost:1337/posts?user.id=${userToFind}&_sort=created_at:desc`,
      {
        headers: {
          Authorization:
            `Bearer ${userToken}`,
        },
      }
    )
      .then(response => { setUserPosts(response.data) });
  }, [currentUserID, userID, userToken]);

  const handleDelete = (postID) => {
    setUserPosts(userPosts.filter(post => post.id !== postID));
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
            {userID ?
                <>
                <h1>Profile de {userInfo.username}</h1>
                <div>Description: {userInfo.description}</div>
                <div>Publications :</div>
                {userPosts.map(element => <Post key={element.id} id={element.id} text={element.text} username={element.user.username} userID={element.user.id} like={element.like} handleDelete={handleDelete} />)}
                </> 
                :
                <>
                <h1>Mon Profile</h1>
                <div className="my-info">
                    <div><strong>Pseudo:</strong> {userInfo.username}</div>
                    <div><strong>E-mail:</strong> {userInfo.email}</div>
                    <div><strong>Description:</strong> {userInfo.description}</div>
                    <Link to={`/profile/edit`}><button>Modifier mes infos</button></Link> 
                </div>         
                <div><strong>Publications:</strong></div>
                {userPosts.map(element => <Post key={element.id} id={element.id} text={element.text} username={element.user.username} userID={element.user.id} like={element.like} handleDelete={handleDelete} />)}
                </>
            }
        </>
        
    )
};

export default Profile;