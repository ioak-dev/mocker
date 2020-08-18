import React from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';

import './style.scss';
import { NavLink } from 'react-router-dom';
import { Authorization } from '../Types/GeneralTypes';
import OakButton from '../../oakui/OakButton';

interface Props {
  asset: string;
  handleClose: any;
  logout: Function;
  login: Function;
}

const Links = (props: Props) => {
  const signin = type => {
    props.login(type);
  };
  const authorization = useSelector(state => state.authorization);
  console.log(authorization, props.asset);
  return (
    <div className="links">
      {!authorization.isAuth && (
        <OakButton
          theme="primary"
          variant="disappear"
          action={() => signin('signin')}
        >
          <i className="material-icons">person</i>Login
        </OakButton>
      )}
      {authorization.isAuth && (
        <>
          <NavLink
            to="/home"
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
          <NavLink
            to={`/${props.asset}/asset/view`}
            className="navitem"
            activeClassName="active"
            onClick={props.handleClose}
          >
            Asset
          </NavLink>
          <OakButton theme="primary" variant="disappear" action={props.logout}>
            <i className="material-icons">power_settings_new</i>Logout
          </OakButton>
        </>
      )}
    </div>
  );
};

export default Links;
