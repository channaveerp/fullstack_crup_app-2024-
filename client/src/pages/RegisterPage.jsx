// ParentComponent.js
import React, { useState } from 'react';
import { inputConfigs } from '../component/InputConfig';
import InputField from '../component/InputFileds';
import './reg.css';
import CustomButton from '../component/CustomButton';
import { registerUser } from '../apis';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClick = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log('form clicked', formData);

    try {
      if (
        !formData.username ||
        !formData.password ||
        !formData.email ||
        !formData.phoneNumber
      ) {
        alert('Please fill fields');
        setLoading(false);
      } else if (formData) {
        const res = await registerUser(formData).then((resdata) => {
          console.log(resdata);
          setLoading(false);
          if (res) {
            setFormData({
              username: '',
              email: '',
              password: '',
              phoneNumber: '',
            });
          }
        });
      }
    } catch (e) {
      console.log('error', e);
      alert(e?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Register Page</h2>
      <div className='RegisterCont'>
        {inputConfigs.map((config, index) => (
          <InputField
            key={index}
            type={config.type}
            label={config.label}
            placeholder={config.placeholder}
            value={formData[config.name]}
            onChange={handleChange}
            name={config.name}
          />
        ))}
      </div>
      <div style={{ width: '20%', margin: 'auto' }}>
        <CustomButton
          title={'Register'}
          handleClick={handleClick}
          loading={loading}
        />
        <span>
          Aready have Account ? <a href='/login'>Login</a>{' '}
        </span>
      </div>
    </>
  );
};

export default RegisterPage;
