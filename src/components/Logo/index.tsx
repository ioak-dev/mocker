import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import './style.scss';
import mockbackWhite from '../../images/mockback_white.svg';
import mockbackBlack from '../../images/mockback_black.svg';

const Logo = () => {
  const authorization = useSelector(state => state.authorization);

  const profile = useSelector(state => state.profile);

  const dispatch = useDispatch();

  return (
    <div className="logo">
      {profile.theme === 'theme_light' && <img className="logo--image" src={mockbackBlack} alt="Expenso logo" />}
      {profile.theme !== 'theme_light' && <img className="logo--image" src={mockbackWhite} alt="Expenso logo" />}
    </div>
  );
};

export default Logo;
