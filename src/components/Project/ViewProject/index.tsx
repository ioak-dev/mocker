import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './style.scss';
import DetailSection from './DetailSection';
import MemberSection from './MemberSection';
import OakSection from '../../../oakui/wc/OakSection';
import OakTab from '../../../oakui/wc/OakTab';
import ListEndpoint from '../../../components/Endpoint/ListEndpoint';

const queryString = require('query-string');

interface Props {
  space: string;
  history: any;
  location: any;
}

const ViewProject = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const query = queryString.parse(props.location.search);
  const project = useSelector((state: any) =>
    state.project.projects.find((item: any) => item._id === query.id)
  );
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (detail: any) => {
    setTabIndex(detail.value);
  };

  return (
    <div className="project-settings-tab">
      <DetailSection
        project={project}
        space={props.space}
        history={props.history}
      />
      <MemberSection
        history={props.history}
        space={props.space}
        project={project}
      />
    </div>
  );
};

export default ViewProject;
