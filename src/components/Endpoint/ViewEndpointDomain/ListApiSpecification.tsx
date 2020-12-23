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
  const [baseUrl, setBaseUrl] = useState(
    `${process.env.REACT_APP_API_URL}/api/${props.space}/${props.project.reference}/${props.endpoint.type}/${props.endpoint.name}`
  );
  useEffect(() => {
    setBaseUrl(
      `${process.env.REACT_APP_API_URL}/api/${props.space}/${props.project.reference}/${props.endpoint.type}/${props.endpoint.name}`
    );
  }, [props]);
  return (
    <>
      {props.project && props.endpoint && (
        <div className="api-specification-list">
          <ApiSpecification
            type="GET"
            pathKey="GET_ALL"
            baseUrl={baseUrl}
            space={props.space}
            history={props.history}
            endpoint={props.endpoint}
            minAliasLength={2}
          />
          <ApiSpecification
            type="GET"
            pathKey="GET_BY_ID"
            baseUrl={baseUrl}
            extendedUrl="/:id"
            space={props.space}
            history={props.history}
            endpoint={props.endpoint}
            noAlias
          />
          <ApiSpecification
            type="PUT"
            pathKey="PUT"
            baseUrl={baseUrl}
            space={props.space}
            history={props.history}
            endpoint={props.endpoint}
          />
          <ApiSpecification
            type="POST"
            pathKey="POST"
            baseUrl={baseUrl}
            space={props.space}
            history={props.history}
            endpoint={props.endpoint}
          />
          <ApiSpecification
            type="DELETE"
            pathKey="DELETE_BY_ID"
            baseUrl={baseUrl}
            extendedUrl="/:id"
            space={props.space}
            history={props.history}
            endpoint={props.endpoint}
          />
        </div>
      )}
    </>
  );
};

export default ListApiSpecification;
