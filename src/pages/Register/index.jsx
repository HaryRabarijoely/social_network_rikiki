import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Input } from 'antd';
import { logIn } from "../../store/userActions";


const Register = () => {
    const urlRegister = 'http://localhost:1337/auth/local/register';
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = (value) => {
        const collectedValues = { username: value['username'], email: value['email'], password: value['password'] }
        axios.post(urlRegister, {
            username: `${collectedValues.username}`,
            email: `${collectedValues.email}`,
            password: `${collectedValues.password}`
        })
            .then(response => {
                Cookies.set('token', response.data.jwt, { sameSite: 'lax' });
                Cookies.set('id', response.data.user.id, { sameSite: 'lax' });
                Cookies.set('isLoggedIn', true, { sameSite: 'lax' });
                dispatch(logIn(Cookies.get('token'), Cookies.get('id')));
                navigate.push('/');
            })
            .catch(error => {
                alert(error.response.data.message[0].message[0].message);
            });
    }
    return (
        <>
            <h1>S'inscrire sur Rikiki Social Network!</h1>
            <div className="form">
                <Form onFinish={(values) => handleSubmit(values)}>

                    <Form.Item name="username" label={<span>Pseudo</span>}><Input /></Form.Item>

                    <Form.Item name="email" label={<span>E-mail</span>}><Input /></Form.Item>
                    
                    <Form.Item name="password" label={<span>Mot de passe</span>}><Input.Password /></Form.Item>

                    <button type="submit">Valider</button>

                </Form>
            </div>   
        </>
    ) 
};

export default Register;