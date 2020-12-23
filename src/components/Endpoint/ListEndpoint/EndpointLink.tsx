import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './EndpointLink.scss';

interface Props {
  space: string;
  history: any;
  endpoint: any;
}

const EndpointLink = (props: Props) => {
  const goToViewPage = () =>
    props.history.push(
      `/${props.space}/endpoint/${props.endpoint.type}/view?id=${props.endpoint._id}`
    );
  return (
    <div className="endpoint-link" onClick={goToViewPage}>
      <div className="endpoint-link--left typography-6">
        <div>{props.endpoint.name}</div>
        <div className="endpoint-link--left--method typography-3">
          {props.endpoint.method}
        </div>
      </div>
      <div className="endpoint-link--type typography-3">
        {props.endpoint.type.toUpperCase()}
      </div>
    </div>
  );
};

export default EndpointLink;
