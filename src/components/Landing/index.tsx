import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
import ListSpaces from './ListSpaces';
import GettingStartedSpace from './GettingStartedSpace';

interface Props {
  history: any;
}

const Landing = (props: Props) => {
  const authorization = useSelector(state => state.authorization);

  const goToLogin = () => {
    window.location.href = `${process.env.REACT_APP_ONEAUTH_URL}/#/appspace/${process.env.REACT_APP_ONEAUTH_APPSPACE_ID}/login?type=signin&appId=${process.env.REACT_APP_ONEAUTH_APP_ID}`;
  }

  return (
    <div className="landing">
          <ListSpaces history={props.history} />
          <hr />
          <GettingStartedSpace history={props.history} />
    </div>
  );
};

export default Landing;
