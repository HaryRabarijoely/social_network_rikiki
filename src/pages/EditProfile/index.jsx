import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Form, Input } from 'antd';
import './index.scss';


const EditProfile = () => {
  const navigate = useNavigate();
  const userToken = useSelector(state => state.token);
  const handleSubmit = (fieldsValue) => {
    const collectedValues = { username: fieldsValue['username'], description: fieldsValue['description'] }
    if (!collectedValues.username || !collectedValues.description) {
      alert('Please fill in both fields.');
    }
    else {
      axios.put(`http://localhost:1337/users/me`,
        {
          description: collectedValues.description,
          username: collectedValues.username
        },
        {
          headers: {
            Authorization:
              `Bearer ${userToken}`,
          }
        })
        .then(response => console.log(response));
      navigate('/profile');
      window.location.reload(false);
    };
  };
  const goBack = () => {
    navigate('/profile');
  };
  return (
    <>
      <h1>Modifier mon Profile</h1>
      <div className="form">
        <Form onFinish={(values) => handleSubmit(values)}>
          <Form.Item name="username" label={<span>Nouveau Pseudo</span>}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label={<span>Nouvelle Description</span>}>
            <Input.TextArea />
          </Form.Item>
          <button type="submit">
            Valider
          </button>
        </Form>
        <button style={{color:'white', margin:'1rem 0', backgroundColor:'grey', width:'53%'}} onClick={goBack}>Retour</button>
      </div>
      
    </>
  );
};

export default EditProfile;