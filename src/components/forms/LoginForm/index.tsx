import { useAuthState } from '../../../context/AuthContext';
import { useUserState } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { StyledForm } from '../StyledForm/index.styled';
import FormError from '../FormError';
import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import useLoginUser from '../../../hooks/useLoginUser';

const LoginForm = () => {
  const [form] = Form.useForm();
  const { authToken, setAuthToken } = useAuthState();
  const { setUserInfo } = useUserState();

  const { loginError, isSubmitting, submitForm } = useLoginUser(form);

  const navigate = useNavigate();


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
    <StyledForm initialValues={{ remember: true }} onFinish={submitForm} form={form}>
      <label htmlFor="identifier">Email</label>
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
      <label htmlFor="password">Password</label>
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
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
        Or{' '}
        <Button onClick={() => navigate('/register')} type="ghost">
          Register now
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

export default LoginForm;
