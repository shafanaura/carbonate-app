import { Alert, Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../API';
import styles from './login.module.css';

const api = new API();
const Login = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    setErrorMsg(null);
    await api
      .postLogin({
        mobile: values.mobile,
        password: values.password,
        dataType: values.dataType,
      })
      .then((res) => {
        if (res.status === 1) {
          localStorage.setItem('token', res.data.authToken);
          localStorage.getItem('token');
          navigate('/');
        } else {
          setErrorMsg(res.data.message);
        }
      });
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      {errorMsg && (
        <Alert
          message={errorMsg}
          type="error"
          showIcon
          closable
          style={{ marginBottom: 14, minWidth: '30%' }}
        />
      )}
      <Form
        layout="vertical"
        className={styles.form}
        initialValues={{ remember: true }}
        onFinish={handleLogin}
        requiredMark={false}
      >
        <Form.Item
          label="Mobile"
          name="mobile"
          rules={[{ required: true, message: 'Please input your mobile!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Data Type"
          name="dataType"
          rules={[{ required: true, message: 'Please input your Data Type!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
