import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import OakHeading from '../../../oakui/OakHeading';
import DetailSection from './DetailSection';
import AdminSection from './AdminSection';

const queryString = require('query-string');

interface Props {
  space: string;
  history: any;
  location: any;
}

const ViewProject = (props: Props) => {
  const query = queryString.parse(props.location.search);
  const project = useSelector(state =>
    state.project.projects.find(item => item._id === query.id)
  );
  const [projectId, setProjectId] = useState();

  const goBack = () => props.history.goBack();

  return (
    <OakPage>
      <OakSection>
        <OakHeading title={project?.name} />
        <div className="view-project">
          <DetailSection
            project={project}
            space={props.space}
            history={props.history}
          />
          <AdminSection
            project={project}
            space={props.space}
            history={props.history}
          />
        </div>
      </OakSection>
    </OakPage>
  );
};

export default ViewProject;
