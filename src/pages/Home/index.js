import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './home.module.css';
import { Typography } from 'antd';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <Link to="/story">Story Page</Link>
      <Link to="/color">Color Page</Link>
      <Typography.Text
        type="danger"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/login');
        }}
        strong
      >
        Logout
      </Typography.Text>
    </div>
  );
};

export default Home;
