import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Input } from 'antd';
import axios from 'axios';
import './index.scss';


const PostForm = ({ handleNewPost }) => {
  const [form] = Form.useForm();
  const userToken = useSelector(state => state.token);
  const userID = useSelector(state => state.id);
  const handleSubmit = (fieldsValue) => {
    const collectedValues = { message: fieldsValue['message'] };
    axios.post('http://localhost:1337/posts',
      {
        text: `${collectedValues.message}`,
        user: `${userID}`,
      },
      {
        headers: {
          Authorization:
            `Bearer ${userToken}`,
        }
      })
  .then(response => {
    handleNewPost(response.data);
    form.resetFields();
  })
  .catch(error => {
  console.log('An error occurred:', error.response.data);
    });

  };
  return (
    <div>
      <Form form={form} onFinish={(values) => handleSubmit(values)}>

        <Form.Item name="message" label={<span>Balance la sauce</span>}>
          <Input />
        </Form.Item>

        <button type="submit" style={{ color: 'white' }}>Publier</button>
        
      </Form>
    </div>
  )
};
export default PostForm;