import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';

import { receiveMessage, sendMessage } from '../../events/MessageService';
import Links from './Links';
import packetWhite from '../../images/mockback_white.svg';
import packetBlack from '../../images/mockback_black.svg';
import './NavPopover.scss';

interface Props {
  asset: string;
  handleClose: any;
  logout: Function;
  login: Function;
}

const NavPopover = (props: Props) => {
  const profile = useSelector(state => state.profile);

  const dispatch = useDispatch();

  return (
    <div className="nav-popover">
      <div className="nav-popover-header">
        {profile.theme === 'theme_light' && (
          <img className="logo" src={packetWhite} alt="Packet logo" />
        )}
        {profile.theme === 'theme_dark' && (
          <img className="logo" src={packetBlack} alt="Packet logo" />
        )}
      </div>
      <div className="nav-content">
        <Links
          asset={props.asset}
          handleClose={props.handleClose}
          logout={props.logout}
          login={props.login}
        />
      </div>
    </div>
  );
};

export default NavPopover;
