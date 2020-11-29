import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './EndpointLink.scss';

interface Props {
  space: string;
  history: any;
  endpoint: any;
  type: 'domain' | 'custom';
}

const EndpointLink = (props: Props) => {
  const goToViewPage = () =>
    props.history.push(
      `/${props.space}/endpoint/${props.type}/view?id=${props.endpoint._id}`
    );
  return (
    <div className="endpoint-link">
      <div className="endpoint-link--name typography-6" onClick={goToViewPage}>
        {props.endpoint.name}
      </div>
    </div>
  );
};

export default EndpointLink;
