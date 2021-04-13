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

function RegistrationForm(props) {
  useEffect(() => {
    props.changePage('register');
  });

  const history = useHistory();

  const onFinish = (values) => {
    const { email, firstname, lastname, password } = values;
    httpClient.signUp(email, password, firstname, lastname).then((user) => {
      if (user) {
        history.push('/login');
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
          name="registration-form"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="First Name"
            name="firstname"
            rules={[
              { required: true, message: 'Please input your first name!' },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastname"
            rules={[
              { required: true, message: 'Please input your last name!' },
            ]}
          >
            <Input size="large" />
          </Form.Item>

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
            <Link to="/login">Already have an account?</Link>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
}

export default RegistrationForm;
