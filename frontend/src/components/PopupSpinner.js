import React from 'react';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export const PopupSpinner = () => {
  return (
    <Loader
      className='popup__spinner'
      type='TailSpin'
      color='#fff'
      height={50}
      width={50}
    />
  );
};
