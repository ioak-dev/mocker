import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ApiSpecification from '../ApiSpecification';

import './style.scss';

const queryString = require('query-string');

interface Props {
  space: string;
  history: any;
  endpoint: any;
  project: any;
}

const ListApiSpecification = (props: Props) => {
  return (
    <>
      {props.project && props.endpoint && (
        <div className="api-specification">
          <ApiSpecification
            type={props.endpoint.method}
            baseUrl={`${process.env.REACT_APP_API_URL}/api/${props.space}/${props.project.reference}/${props.endpoint.type}/${props.endpoint.name}`}
            pathKey="PRIMARY"
            endpoint={props.endpoint}
            space={props.space}
            history={props.history}
          />
        </div>
      )}
    </>
  );
};

export default ListApiSpecification;
