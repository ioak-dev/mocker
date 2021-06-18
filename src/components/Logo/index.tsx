import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import './style.scss';
import mockerWhite from '../../images/mocker_white.svg';
import mockerBlack from '../../images/mocker_black.svg';

const Logo = () => {
  const authorization = useSelector((state: any) => state.authorization);

  const profile = useSelector((state: any) => state.profile);

  const dispatch = useDispatch();

  return (
    <div className="logo">
      {profile.theme === 'theme_light' && (
        <img className="logo--image" src={mockerWhite} alt="Mocker logo" />
      )}
      {profile.theme !== 'theme_light' && (
        <img className="logo--image" src={mockerWhite} alt="Mocker logo" />
      )}
    </div>
  );
};

export default Logo;
