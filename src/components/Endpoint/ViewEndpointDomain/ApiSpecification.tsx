import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import ApiSpecificationLink from './ApiSpecificationLink';

const queryString = require('query-string');

interface Props {
  space: string;
  endpoint: any;
  project: any;
}

const ApiSpecification = (props: Props) => {
  return (
    <>
      {props.project && props.endpoint && (
        <>
          <ApiSpecificationLink
            type="GET"
            url={`${process.env.REACT_APP_API_URL}/api/${props.space}/${props.project.reference}/domain/${props.endpoint.name}`}
          />
        </>
      )}
    </>
  );
};

export default ApiSpecification;
