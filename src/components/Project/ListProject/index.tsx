import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import ProjectLink from './ProjectLink';
import OakSection from '../../../oakui/wc/OakSection';
import OakButton from '../../../oakui/wc/OakButton';

interface Props {
  space: string;
  history: any;
}

const ListProject = (props: Props) => {
  const projects = useSelector((state: any) => state.project.projects);

  const gotoCreatePage = () =>
    props.history.push(`/${props.space}/project/create`);

  return (
    <div className="list-project">
      {/* <div className="section__heading">Projects</div> */}
      <div className="action-footer position-left">
        <OakButton
          theme="default"
          variant="appear"
          handleClick={gotoCreatePage}
        >
          New project
        </OakButton>
      </div>
      <div className="list-project__container">
        {projects?.map((item: any) => (
          <ProjectLink
            key={item._id}
            space={props.space}
            history={props.history}
            project={item}
          />
        ))}
      </div>
    </div>
  );
};

export default ListProject;
