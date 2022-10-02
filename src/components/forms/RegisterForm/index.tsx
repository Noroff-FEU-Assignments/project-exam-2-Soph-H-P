import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useAuthState } from '../../../context/AuthContext';
import { useUserState } from '../../../context/UserContext';
import useRegisterUser, { RegisterFormInterface } from '../../../hooks/useRegisterUser';
import FormMessage from '../FormMessage';
import { StyledForm } from '../StyledForm/index.styled';

/**
 * Register form component renders a form taking the users email, username and password
 * this contains rules to ensure the details given are correct.
 *
 * @example <RegisterForm />
 * @returns {React.ReactElement}
 */

const RegisterForm = (): React.ReactElement => {
  const { authToken, setAuthToken } = useAuthState();
  const { setUserInfo } = useUserState();

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { registerError, isSubmitting, submitForm, isSubmitted } = useRegisterUser(form);

  return (
    <StyledForm
      form={form}
      initialValues={{ remember: true }}
      onFinish={data => submitForm(data as RegisterFormInterface)}
    >
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
            max: 15,
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
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>
      {registerError && <FormMessage error={true}>{registerError}</FormMessage>}
      {isSubmitted && <FormMessage>Congratulations you are now a member</FormMessage>}
      <Form.Item>
        <Button type="primary" htmlType="submit" size="large">
          {isSubmitting ? 'Registering...' : 'Register'}
        </Button>
        <span>or</span>
        <Button onClick={() => navigate('/login')} type="ghost" size="large">
          Sign in
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

export default RegisterForm;
