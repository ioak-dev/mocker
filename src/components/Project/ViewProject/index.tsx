import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './style.scss';
import DetailSection from './DetailSection';
import { getProjectMembers } from '../service';
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
  const authorization = useSelector((state) => state.authorization);
  const query = queryString.parse(props.location.search);
  const project = useSelector((state) =>
    state.project.projects.find((item) => item._id === query.id)
  );
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (detail: any) => {
    setTabIndex(detail.value);
  };

  return (
    <OakTab
      tabs={['Endpoints', 'Configuration']}
      variant="pills"
      // nobaseline
      color="info"
      rounded
      handleChange={handleTabChange}
    >
      <div className="tab-section">
        {tabIndex === 0 && (
          <ListEndpoint
            projectId={project?._id}
            space={props.space}
            history={props.history}
          />
        )}
        {tabIndex === 1 && (
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
        )}
      </div>
    </OakTab>
  );
};

export default ViewProject;
