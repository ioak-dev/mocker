import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './DomainLink.scss';

interface Props {
  space: string;
  history: any;
  domain: any;
}

const DomainLink = (props: Props) => {
  const goToViewPage = () =>
    props.history.push(`/${props.space}/endpoint/view?id=${props.domain._id}`);
  return (
    <div className="domain-link">
      <div className="domain-link--name typography-10" onClick={goToViewPage}>
        {props.domain.name}
      </div>
      <div className="domain-link--description">{props.domain.description}</div>
    </div>
  );
};

export default DomainLink;
