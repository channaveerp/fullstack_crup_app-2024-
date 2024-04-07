import React, { useState } from 'react';
import { LoginConfigs } from '../component/InputConfig';
import InputField from '../component/InputFileds';
import './reg.css';
import CustomButton from '../component/CustomButton';
import { loginUser } from '../apis';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    if (!formData.email || !formData.password) {
      alert('Please fill fields');
      setLoading(false);
      return;
    }
    try {
      const res = await loginUser(formData);
      setLoading(false);
      if (res) {
        alert(res?.data?.message);
        navigate('/users-list');
      }
    } catch (e) {
      setLoading(false);
      alert(e.data?.message);
      console.log('error', e);
    }
  };
  return (
    <div>
      <h2>Login Page</h2>
      {LoginConfigs.map((config, index) => (
        <div className='RegisterCont'>
          <InputField
            key={index}
            type={config.type}
            label={config.label}
            placeholder={config.placeholder}
            value={formData[config.name]}
            onChange={handleChange}
            name={config.name}
          />
        </div>
      ))}
      <div style={{ width: '20%', margin: 'auto' }}>
        <CustomButton
          title={'Login'}
          handleClick={handleClick}
          loading={loading}
        />
        <span>
          Don't have Account ? <a href='/'>Register</a>{' '}
        </span>
      </div>
    </div>
  );
};

export default Login;
