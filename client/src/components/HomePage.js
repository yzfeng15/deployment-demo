import { Layout } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import homeImg from '../assets/home-img.svg';
const { Content } = Layout;

function HomePage(props) {
  useEffect(() => {
    props.changePage('home');
  });

  return (
    <Content>
      <div className="site-layout-content">
        <div className="home-content">
          <div className="home-text">
            <h1>Welcome!</h1>
            <p>
              Welcome to <em>CIS 557 Deployment Demo</em>. To log in, click{' '}
              <Link to="/login">here</Link>. To register click{' '}
              <Link to="/register">here</Link>.
            </p>
          </div>
          <div>
            <img className="home-img" src={homeImg} alt="" />
          </div>
        </div>
      </div>
    </Content>
  );
}

export default HomePage;
