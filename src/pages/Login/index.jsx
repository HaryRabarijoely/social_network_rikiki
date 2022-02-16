import React from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { logIn } from "../../store/userActions";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const urlLogin = 'http://localhost:1337/auth/local';
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = (fieldsValue) => {
    const collectedValues = {email: fieldsValue['email'], password: fieldsValue['password']}
    axios.post(urlLogin, {
    identifier: `${collectedValues.email}`,
    password: `${collectedValues.password}`,
  })
  .then(response => {
    Cookies.set('token', response.data.jwt, { sameSite: 'lax' });
    Cookies.set('id', response.data.user.id, { sameSite: 'lax' });
    Cookies.set('isLoggedIn', true, { sameSite: 'lax' });
    dispatch(logIn(Cookies.get('token'), Cookies.get('id')));
    navigate.push('/');
  })
  .catch(error => {
    alert(error.response.data.message[0].messages[0].message);
  });
  }

    return (
        <>
            <h1>Connectez-vous avec votre compte Rikiki Social Network!</h1>
            <div className="form">
                <Form onFinish={(values) => handleSubmit(values)}>

                    <Form.Item name="email" label={<span>E-mail</span>}><Input /></Form.Item>

                    <Form.Item name="password" label={<span>Mot de passe</span>}><Input.Password /></Form.Item>

                    <button type="submit">Valider</button>

                </Form>
            </div>      
        </>
    );
};

export default Login;