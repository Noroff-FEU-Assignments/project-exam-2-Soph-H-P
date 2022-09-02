import { useState } from 'react';
import { useAuthState } from '../../../context/AuthContext';
import { useUserState } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API, { accessTokenUrlEndpoint } from '../../../constants/api';
import { StyledForm } from '../StyledForm/index.styled';
import FormError from '../FormError';
import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const LoginForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { authToken, setAuthToken } = useAuthState();
  const { userInfo, setUserInfo } = useUserState();

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    setLoginError(null);
    try {
      const response = await axios.post(API + accessTokenUrlEndpoint, data);
      setAuthToken(response.data.jwt);
      setUserInfo(response.data.user);
      navigate('/admin/moderate-sightings');
    } catch (error: unknown) {
      console.log('error', error);
      if (axios.isAxiosError(error)) {
        if (!error?.response) {
          console.log('No Server Response');
          setLoginError(
            'Looks like there is a problem with our server, please check and try again.'
          );
        } else if (error.response?.status === 400 || error.response?.status === 403) {
          setLoginError(
            'Looks like your username or password is wrong, please check and try again.'
          );
        } else {
          setLoginError(
            'Sorry we seem to be have trouble logging you in at the moment, please try again later.'
          );
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (authToken)
    return (
      <StyledForm>
        <p style={{ textAlign: 'center' }}>You are already logged in</p>
        <Button
          onClick={() => {
            setAuthToken(null);
            setUserInfo(null);
            navigate('/');
          }}
        >
          Logout
        </Button>
      </StyledForm>
    );

  return (
    <StyledForm
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onSubmit}
    >
      <Form.Item
        name="identifier"
        rules={[
          {
            type: 'email',
            message: 'This is not valid E-mail!',
          },
          { required: true, message: 'Please input your email' },
        ]}
      >
        <Input placeholder="example@gmail.com" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password' }]}
      >
        <Input.Password
          placeholder="password"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>
      {/* <Form.Item>
        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item> */}
      {loginError && <FormError>{loginError}</FormError>}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          {submitting ? 'Logging in...' : 'Login'}
        </Button>
        {/* Or <a href="">register now!</a> */}
      </Form.Item>
    </StyledForm>
  );
};

export default LoginForm;
