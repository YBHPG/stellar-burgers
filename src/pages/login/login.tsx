import { SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/slices/userSlice';

export function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const location = useLocation();

  const sendAction = useDispatch();
  const navigator = useNavigate();

  const onFormSubmit = async (evt: SyntheticEvent) => {
    evt.preventDefault();

    try {
      setFeedbackMsg('');
      await sendAction(
        loginUser({ email: userEmail, password: userPassword })
      ).unwrap();
      const from = location.state?.from || '/';
      navigator(from, { replace: true });
    } catch (error) {
      console.error('Ошибка логина:', error);
      setFeedbackMsg('Неверный email или пароль');
    }
  };

  return (
    <LoginUI
      errorText={feedbackMsg}
      email={userEmail}
      setEmail={setUserEmail}
      password={userPassword}
      setPassword={setUserPassword}
      handleSubmit={onFormSubmit}
    />
  );
}
