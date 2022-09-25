import { useAuthState } from '../../../context/AuthContext';
import { useUserState } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { StyledForm } from '../StyledForm/index.styled';
import FormError from '../FormMessage';
import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import useRegisterUser from '../../../hooks/useRegisterUser';

const RegisterForm = () => {
  const { authToken, setAuthToken } = useAuthState();
  const { setUserInfo } = useUserState();

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { registerError, isSubmitting, submitForm } = useRegisterUser(form);

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
    <StyledForm form={form} initialValues={{ remember: true }} onFinish={submitForm}>
      <label htmlFor="username">Username</label>
      <Form.Item
        name="username"
        rules={[
          {
            pattern: new RegExp(/^[A-Za-z0-9][A-Za-z0-9]*$/),
            message: 'Please do not use spaces or symbols in your username',
          },
          {
            required: true,
            message: 'Please input your username',
          },
          {
            max: 20,
            message: 'Cannot be more than 15 characters',
          },
        ]}
      >
        <Input type="text" placeholder="BlueFootedSophie" />
      </Form.Item>
      <label htmlFor="email">Email</label>
      <Form.Item
        name="email"
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
      {registerError && <FormError>{registerError}</FormError>}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          {isSubmitting ? 'Registering...' : 'Register'}
        </Button>
        Or{' '}
        <Button onClick={() => navigate('/login')} type="ghost">
          Sign in
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

export default RegisterForm;
