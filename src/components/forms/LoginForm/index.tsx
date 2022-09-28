import { useAuthState } from '../../../context/AuthContext';
import { useUserState } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { StyledForm } from '../StyledForm/index.styled';
import FormMessage from '../FormMessage';
import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import useLoginUser, { LoginFormInterface } from '../../../hooks/useLoginUser';
import PageTitle from '../../common/typography/PageTitle';

const LoginForm = () => {
  const [form] = Form.useForm();
  const { authToken, setAuthToken } = useAuthState();
  const { setUserInfo } = useUserState();

  const { loginError, isSubmitting, submitForm } = useLoginUser(form);

  const navigate = useNavigate();

  if (authToken)
    return (
      <StyledForm>
        <PageTitle>Log Out</PageTitle>
        <p style={{ textAlign: 'center' }}>You are already logged in</p>
        <Button
          onClick={() => {
            setAuthToken(null);
            setUserInfo(null);
            navigate('/');
          }}
          size="large"
        >
          Logout
        </Button>
      </StyledForm>
    );

  return (
    <StyledForm
      initialValues={{ remember: true }}
      onFinish={(data) => submitForm(data as LoginFormInterface)}
      form={form}
    >
      <PageTitle>Log in</PageTitle>
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
      {loginError && <FormMessage error={true}>{loginError}</FormMessage>}
      <Form.Item>
        <Button type="primary" htmlType="submit" size="large">
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
        <span>or</span>
        <Button onClick={() => navigate('/register')} type="ghost" size="large">
          Register now
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

export default LoginForm;
