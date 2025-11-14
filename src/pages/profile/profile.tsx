import { ProfileUI } from '@ui-pages';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateUserThunk } from '../../services/slices/userSlice';
import { Preloader } from '@ui';

export function Profile()
{
    const sendAction = useDispatch();

    const clientData = useSelector((state) => state.user.user);

    const [fields, setFields] = useState({
        name: '',
        email: '',
        password: ''
    });

    useEffect(()  =>
    {
        setFields(function(currentData)
        {
            return {
                ...currentData,
                name: clientData?.name || '',
                email: clientData?.email || ''
            };
        });
    }, [clientData]);

    if (!clientData)
    {
        return <Preloader />;
    }

    const hasChanges  = 
        fields.name !==  clientData?.name ||
        fields.email !==  clientData?.email ||
        !!fields.password;

    const onSave = function(evt: SyntheticEvent)
    {
        evt.preventDefault();
        sendAction(updateUserThunk(fields));
        setFields({
            name: clientData?.name || '',
            email: clientData?.email || '',
            password: ''
        });
    };

  const onReset = (evt: SyntheticEvent) => {
    evt.preventDefault();
    setFields({
      name: clientData?.name || '',
      email: clientData?.email || '',
      password: ''
    });
  };

  function onFieldChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setFields((currentData) => ({
      ...currentData,
      [evt.target.name]: evt.target.value
    }));
  }

  return (
    <ProfileUI
      formValue={fields}
      isFormChanged={hasChanges}
      handleCancel={onReset}
      handleSubmit={onSave}
      handleInputChange={onFieldChange}
    />
  );
}
