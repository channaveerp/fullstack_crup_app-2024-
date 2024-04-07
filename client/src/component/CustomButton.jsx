import React from 'react';
import './CustomButton.css';
import Spinner from './Loading';

const CustomButton = ({ title, link, handleClick, loading }) => {
  return (
    <div className='button-cont'>
      <button link={link} className='custom-buttom' onClick={handleClick}>
        {loading ? <Spinner /> : title}
      </button>
    </div>
  );
};
export default CustomButton;
