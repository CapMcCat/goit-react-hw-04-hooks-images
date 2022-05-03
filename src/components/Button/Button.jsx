import React from 'react';
import s from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <button className={s.Button} onClick={onClick} type="button">
      Load more
    </button>
  );
};
