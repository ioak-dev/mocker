import React from 'react';

import './Links.scss';
import { NavLink } from 'react-router-dom';
import OakButton from '../../oakui/OakButton';

interface Props {
  space: string;
}

const Links = (props: Props) => {
  return (
    <div className="links">
      <NavLink
        to={`/${props.space}/home`}
        className="navitem"
        activeClassName="active"
      >
        Home
      </NavLink>
      <NavLink
        to={`/${props.space}/project`}
        className="navitem"
        activeClassName="active"
      >
        Projects
      </NavLink>
      <NavLink
        to={`/${props.space}/endpoint`}
        className="navitem"
        activeClassName="active"
      >
        Endpoints
      </NavLink>
    </div>
  );
};

export default Links;
