import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPenAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OakButton from '../../../oakui/wc/OakButton';
import OakClickArea from '../../../oakui/wc/OakClickArea';

import './ProjectLink.scss';

interface Props {
  space: string;
  history: any;
  project: any;
}

const ProjectLink = (props: Props) => {
  const goToViewPage = () =>
    props.history.push(`/${props.space}/project/view?id=${props.project._id}`);
  const goToEndpointPage = () =>
    props.history.push(`/${props.space}/endpoint?id=${props.project._id}`);

  return (
    <div className="project-link">
      <OakClickArea handleClick={goToEndpointPage}>
        <div className="project-link__left">
          <div className="project-link__left__name">{props.project.name}</div>
          <div className="project-link__left__description">
            {props.project.description}
          </div>
        </div>
      </OakClickArea>
      <div className="project-link__right">
        <OakButton
          handleClick={goToViewPage}
          theme="primary"
          shape="icon"
          variant="drama"
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </OakButton>
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

export default ProjectLink;
