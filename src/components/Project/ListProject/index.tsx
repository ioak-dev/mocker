import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import ProjectLink from './ProjectLink';
import OakSection from '../../../oakui/wc/OakSection';

interface Props {
  space: string;
  history: any;
}

const ListProject = (props: Props) => {
  const projects = useSelector((state: any) => state.project.projects);
  const gotoCreatePage = () =>
    props.history.push(`/${props.space}/project/create`);
  return (
    <OakSection>
      List of projects
      <div className="list-project">
        {projects?.map((item: any) => (
          <ProjectLink
            key={item._id}
            space={props.space}
            history={props.history}
            project={item}
          />
        ))}
      </div>
    </OakSection>
  );
};

export default ListProject;
