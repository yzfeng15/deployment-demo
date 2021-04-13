import { Layout, Form, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import httpClient from '../auth.helper';
const { Content } = Layout;
const layout = {
  labelCol: { span: 8, offset: 4 },
  wrapperCol: { span: 16, offset: 4 },
};

function LoginForm(props) {
  useEffect(() => {
    props.changePage('login');
  });
  const history = useHistory();

  const onFinish = (values) => {
    const { email, password } = values;
    httpClient.logIn(email, password).then((user) => {
      if (user) {
        props.onSuccess(user);
        history.push('/');
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Content>
      <div className="site-layout-content">
        <Form
          {...layout}
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              {
                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/,
                message: 'Must be a valid email!',
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>

          <Form.Item>
            <Link to="/registration">Register for an account</Link>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
}

export default LoginForm;
