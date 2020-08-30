import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Init = () => {
  const authorization = useSelector(state => state.authorization);
  const dispatch = useDispatch();
  useEffect(() => {
    if (authorization.isAuth) {
      console.log(authorization.token);
      console.log('Initialization logic here');
    }
  }, [authorization]);
  return <></>;
};

export default Init;
