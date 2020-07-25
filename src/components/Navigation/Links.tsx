import React from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';

import './style.scss';
import { NavLink } from 'react-router-dom';
import { Authorization } from '../Types/GeneralTypes';

interface Props {
  asset: string;
  handleClose: any;
}

const Links = (props: Props) => {
  const authorization = useSelector(state => state.authorization);
  return (
    <div className="links">
      {authorization.isAuth && (
        <>
          <NavLink
            to={`/${props.asset}/home`}
            className="navitem"
            activeClassName="active"
            onClick={props.handleClose}
          >
            Home
          </NavLink>
          <NavLink
            to={`/${props.asset}/project/list`}
            className="navitem"
            activeClassName="active"
            onClick={props.handleClose}
          >
            Projects
          </NavLink>
          <NavLink
            to={`/${props.asset}/template/list`}
            className="navitem"
            activeClassName="active"
            onClick={props.handleClose}
          >
            Templates
          </NavLink>

          <NavLink
            to={`/${props.asset}/asset/view`}
            className="navitem"
            activeClassName="active"
            onClick={props.handleClose}
          >
            Asset
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Links;
