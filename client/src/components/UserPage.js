import { Layout } from 'antd';
import React, { useEffect } from 'react';
import dogimg from '../assets/dog.jpeg';
const { Content } = Layout;

function HomePage(props) {
  useEffect(() => {
    props.changePage('profile');
  });

  const user = props.currentUser;

  return (
    <Content>
      <div className="site-layout-content">
        <div className="home-content">
          <div className="home-text">
            <h1>
              Welcome {user.firstName} {user.lastName}!
            </h1>
            <h3>Here's a dog!</h3>
            <img src={dogimg} alt="golden retriever puppy" width="400px" />
          </div>
        </div>
      </div>
    </Content>
  );
}

export default HomePage;
