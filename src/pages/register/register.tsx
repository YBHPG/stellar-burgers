import { SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/slices/userSlice';

export function Register() {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPassword, setClientPassword] = useState('');

  const sendAction = useDispatch();
  const navigator = useNavigate();

  const onFormSubmit = async (evt: SyntheticEvent) => {
    evt.preventDefault();
    try {
      await sendAction(
        registerUser({
          name: clientName,
          email: clientEmail,
          password: clientPassword
        })
      ).unwrap();
      navigator('/profile');
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <RegisterUI
      errorText=''
      email={clientEmail}
      userName={clientName}
      password={clientPassword}
      setEmail={setClientEmail}
      setPassword={setClientPassword}
      setUserName={setClientName}
      handleSubmit={onFormSubmit}
    />
  );
}
