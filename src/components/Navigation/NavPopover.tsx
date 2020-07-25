import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';

import { receiveMessage, sendMessage } from '../../events/MessageService';
import Links from './Links';
import mockbackWhite from '../../images/mirror_white.svg';
import mockbackBlack from '../../images/mirror_black.svg';
import './NavPopover.scss';

interface Props {
  asset: string;
  handleClose: any;
}

const NavPopover = (props: Props) => {
  const profile = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  return (
    <div className="nav-popover">
      <div className="nav-popover-header">
        {profile.theme === 'theme_light' && (
          <img className="logo" src={mockbackWhite} alt="Mockback logo" />
        )}
        {profile.theme === 'theme_dark' && (
          <img className="logo" src={mockbackBlack} alt="Mockback logo" />
        )}
      </div>
      <div className="nav-content">
        <Links asset={props.asset} handleClose={props.handleClose} />
      </div>
    </div>
  );
};

export default NavPopover;
