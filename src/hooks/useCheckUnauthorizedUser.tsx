import { useAuthState } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../context/UserContext';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { notification } from 'antd';

const useCheckUnauthorizedUser = () => {
  const navigate = useNavigate();
  const { setAuthToken } = useAuthState();
  const { setUserInfo } = useUserState();

  const openNotification = () => {
    notification.open({
      message: 'Please log in again',
      description: 'You have been logged out due to security reasons, please log in.',
    });
  };

  const checkUnauthorizedUser = (
    error: unknown,
    setError: Dispatch<SetStateAction<string | null>> | Dispatch<SetStateAction<string>>,
    message: string
  ) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log(error);
        console.log('You are not authorised to see this, please log in.');
        setAuthToken(null);
        setUserInfo(null);
        navigate('/login');
        openNotification();
      } else {
        setError(message);
        console.log(error);
      }
    } else {
      setError(message);
      console.log(error);
    }
  };

  return { checkUnauthorizedUser };
};

export default useCheckUnauthorizedUser;