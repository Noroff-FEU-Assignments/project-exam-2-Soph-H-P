import { useState } from 'react';
import { useAuthState } from '../../../context/AuthContext';
import { useUserState } from '../../../context/UserContext';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API, { accessTokenUrlEndpoint } from '../../../constants/api';
import { StyledForm, StyledSubmitButton } from './index.styled';
import FormError from '../FormError';
import { Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const schema = yup.object().shape({
  identifier: yup.string().required('Please enter your username'),
  password: yup.string().required('Please enter your password'),
});

const LoginForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { authToken, setAuthToken } = useAuthState();
  const { userInfo, setUserInfo } = useUserState();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FieldValues) => {
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
        <StyledSubmitButton
          onClick={() => {
            setAuthToken(null);
            setUserInfo(null);
            navigate('/');
          }}
        >
          Logout
        </StyledSubmitButton>
      </StyledForm>
    );

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={submitting}>
        <Space direction="vertical" size={35}>
          <Space direction="vertical" size={10}>
            <label htmlFor="identifier">Username</label>

            <Input placeholder="Username" {...register('identifier')} />

            {/* <input placeholder="Username" {...register('identifier')} /> */}
            {errors.username?.message && (
              <FormError>{errors.username.message.toString()}</FormError>
            )}
          </Space>

          <Space direction="vertical" size={10}>
            <label htmlFor="password">Password</label>
            {/* <input placeholder="Password" {...register('password')} type="password" /> */}
            <Input.Password
              {...register('password')}
              placeholder="input password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              onChange={(e) => console.log(e)}
            />
            {errors.password?.message && (
              <FormError>{errors.password.message.toString()}</FormError>
            )}
          </Space>
          {loginError && <FormError>{loginError}</FormError>}
          <StyledSubmitButton>{submitting ? 'Logging in...' : 'Login'}</StyledSubmitButton>
        </Space>
      </fieldset>
    </StyledForm>
  );
};

export default LoginForm;
