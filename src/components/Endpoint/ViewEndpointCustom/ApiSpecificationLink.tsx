import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './ApiSpecificationLink.scss';

const queryString = require('query-string');

interface Props {
  type: string;
  url: string;
}

const ApiSpecificationLink = (props: Props) => {
  return (
    <div className="api-specification-link">
      <div className={props.type}>{props.type}</div>
      <div>{props.url}</div>
      <div>
        <i className="material-icons">content_copy</i>
      </div>
    </div>
  );
};

export default ApiSpecificationLink;
