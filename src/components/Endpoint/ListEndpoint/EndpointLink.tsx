import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPenAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OakButton from '../../../oakui/wc/OakButton';
import OakClickArea from '../../../oakui/wc/OakClickArea';

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
    <div className="endpoint-link">
      <OakClickArea handleClick={goToViewPage}>
        <div className="endpoint-link__left">
          <div className="endpoint-link__left__name">{props.endpoint.name}</div>
          {props.endpoint.type === 'custom' && (
            <div className="endpoint-link__left__subtitle">
              {props.endpoint.method}
            </div>
          )}
          {props.endpoint.type === 'domain' && (
            <div className="endpoint-link__left__subtitle">DOMAIN</div>
          )}
        </div>
      </OakClickArea>
      <div className="endpoint-link__right">
        <OakButton
          handleClick={goToViewPage}
          theme="danger"
          shape="icon"
          variant="drama"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </OakButton>
      </div>
    </div>
  );
};

export default EndpointLink;
