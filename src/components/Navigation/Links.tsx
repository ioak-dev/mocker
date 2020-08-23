import React from 'react';

import './style.scss';
import { NavLink } from 'react-router-dom';
import OakButton from '../../oakui/OakButton';

interface Props {
  asset: string;
  handleClose: any;
}

const Links = (props: Props) => {
  return (
    <div className="links">
      <NavLink
        to="/home"
        className="navitem"
        activeClassName="active"
        onClick={props.handleClose}
      >
        Home
      </NavLink>
      <NavLink
        to={`/${props.asset}/project`}
        className="navitem"
        activeClassName="active"
        onClick={props.handleClose}
      >
        Projects
      </NavLink>
      <NavLink
        to={`/${props.asset}/template`}
        className="navitem"
        activeClassName="active"
        onClick={props.handleClose}
      >
        Templates
      </NavLink>
    </div>
  );
};

export default Links;
